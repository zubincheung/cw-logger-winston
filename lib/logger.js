const winston = require('winston');
const utils = require('./utils');

class Logger {
  /**
   * Creates an instance of Logger.
   * @param {Transport[]} transports
   * @param {string} name
   * @memberof Logger
   */
  constructor(transports, name) {
    this.logger = winston.createLogger({ transports });
    this.name = name;

    ['error', 'warn', 'info', 'debug'].forEach(level => {
      Logger.prototype[level] = (...args) => {
        this.logger[level](utils.concatLog(...args), { module: this.name });
        return this;
      };
    });
  }
}

module.exports = Logger;
