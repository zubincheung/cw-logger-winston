const winston = require('winston');
require('winston-daily-rotate-file');

const defaultFormatter = require('./default_formatter');

module.exports = class FileTransport extends winston.transports.DailyRotateFile {
  constructor(options) {
    options.datePattern = 'YYYY-MM-DD';
    options.zippedArchive = true;
    options.maxSize = '100m';
    options.maxFiles = '14d';

    options.format = winston.format.combine(
      defaultFormatter,
      winston.format.printf(options.formatter),
    );

    if (options.json) {
      options.format = winston.format.combine(
        defaultFormatter,
        winston.format.json(options.formatter),
      );
    }

    super(options);
  }
};
