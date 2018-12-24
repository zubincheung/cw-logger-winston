const winston = require('winston');
require('winston-daily-rotate-file');

const { join } = require('path');
const { hostname } = require('os');

const utils = require('./utils');

const { INFO, ERROR } = require('./level');

const CONSOLE_TRANSPORT = Symbol('Transport#console');
const INFO_TRANSPORT = Symbol('Transport#info');
const ERROR_TRANSPORT = Symbol('Transport#error');
const DEFAULT_FILE_OPTION = Symbol('Transport#defaultFileOption');
const DEFAULT_FORMATTER = Symbol('Transport#defaultFormatter');

class Transport {
  constructor(options) {
    this[CONSOLE_TRANSPORT] = new winston.transports.Console({
      level: options.consoleLevel,
      format: winston.format.combine(
        this[DEFAULT_FORMATTER],
        winston.format.colorize(),
        winston.format.printf(options.formatter),
      ),
    });

    this[INFO_TRANSPORT] = new winston.transports.DailyRotateFile(
      utils.assign(this[DEFAULT_FILE_OPTION], {
        level: INFO,
        filename: join(options.filePath, `${options.name}-info-%DATE%.log`),
        format: winston.format.combine(
          this[DEFAULT_FORMATTER],
          winston.format.printf(options.formatter),
        ),
      }),
    );

    this[ERROR_TRANSPORT] = new winston.transports.DailyRotateFile(
      utils.assign(this[DEFAULT_FILE_OPTION], {
        level: ERROR,
        filename: join(options.filePath, 'error-%DATE%.log'),
        format: winston.format.combine(
          this[DEFAULT_FORMATTER],
          winston.format.printf(options.formatter),
        ),
      }),
    );
  }

  get [DEFAULT_FILE_OPTION]() {
    return {
      level: INFO,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '100m',
      maxFiles: '14d',
      json: false,
    };
  }

  get [DEFAULT_FORMATTER]() {
    return winston.format.combine(
      winston.format(info => {
        info.hostname = hostname();
        info.pid = process.pid;
        info.level = info.level.toUpperCase();
        return info;
      })(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss,SSSS' }),
      winston.format.ms(),
    );
  }

  get transports() {
    return [this[CONSOLE_TRANSPORT], this[INFO_TRANSPORT], this[ERROR_TRANSPORT]];
  }
}

module.exports = Transport;
