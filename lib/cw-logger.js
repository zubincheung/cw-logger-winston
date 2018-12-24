const Transport = require('./transport.js');
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

    const opts = utils.assign(this.defaultOptions, options);
    this.transports = new Transport(opts).transports;
    this.set(opts.name);
  }

  get defaultOptions() {
    return {
      name: 'app',
      module: '',
      filePath: './logs',
      formatter: meta => {
        return `${meta.timestamp} ${meta.level} ${meta.hostname} ${meta.pid} (${meta.ms}) [${
          meta.module
        }] ${meta.message}`;
      },
      consoleLevel: Levels.ERROR,
      outputJSON: false,
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

['error', 'warn', 'info', 'debug'].forEach(level => {
  // eslint-disable-next-line func-names
  CWLogger.prototype[level] = function(...args) {
    return this.get('app')[level](...args);
  };
});

module.exports = CWLogger;
