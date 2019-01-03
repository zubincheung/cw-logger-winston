const { join } = require('path');

const FileTransport = require('./transport/file');
const ConsoleTransport = require('./transport/console');
const Levels = require('./level.js');
const Logger = require('./logger');
const utils = require('./utils');

/**
 * Logger base on winston
 *
 * @example
 * ```js
 * const logger = new Logger({
 *   name: 'app';
 *   filePath:'./logs';
 *   consoleLevel: 'error';
 * });
 * logger.info('foo');
 * ```
 */
class CWLogger extends Map {
  /**
   * @constructor
   * @param {LogerOptions} options logger options assign with `defaultOptions` propery
   */
  constructor(options) {
    super();

    this.options = utils.assign(this.defaultOptions, options);

    const consoleTransport = new ConsoleTransport({
      level: this.options.consoleLevel,
      name: this.options.name,
      formatter: this.options.consoleFormatter,
    });

    const infoTransport = new FileTransport({
      level: Levels.INFO,
      name: this.options.name,
      filename: join(this.options.filePath, `info/${this.options.name}-info-%DATE%.log`),
      formatter: this.options.formatter,
      json: this.options.json,
    });

    const errorTransport = new FileTransport({
      level: Levels.ERROR,
      name: this.options.name,
      filename: join(this.options.filePath, 'error/error-%DATE%.log'),
      formatter: this.options.formatter,
      json: this.options.json,
    });

    this.transports = [consoleTransport, infoTransport, errorTransport];
    this.set(this.options.name);

    ['error', 'warn', 'info', 'debug'].forEach(level => {
      this[level] = (...args) => {
        return this.get('app')[level](...args);
      };
    });
  }

  get defaultOptions() {
    const formatter = meta => {
      return `${meta.timestamp} ${meta.level} ${meta.hostname} ${meta.pid} (${meta.ms}) [${
        meta.module
      }] ${meta.message}`;
    };
    return {
      name: 'app',
      module: '',
      filePath: './logs',
      formatter,
      consoleFormatter: formatter,
      consoleLevel: Levels.ERROR,
      json: false,
    };
  }

  /**
   * set logger
   *
   * @param {string} name logger name
   * @returns  {Logger}  logger
   * @memberof CWLogger
   */
  set(name) {
    if (super.has(name)) {
      return super.get(name);
    }

    const logger = new Logger(this.transports, name);
    super.set(name, logger);
    return logger;
  }
}

module.exports = CWLogger;
