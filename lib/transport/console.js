const winston = require('winston');
const defaultFormatter = require('./default_formatter');

module.exports = class ConsoleTransport extends winston.transports.Console {
  constructor(options) {
    super(options);

    this.format = winston.format.combine(
      defaultFormatter,
      winston.format.colorize(),
      winston.format.printf(options.formatter),
    );
  }
};
