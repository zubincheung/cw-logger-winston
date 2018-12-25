interface ILoggerLevel {
  ALL: string;
  DEBUG: string;
  INFO: string;
  WARN: string;
  ERROR: string;
  NONE: string;
}

export const levels: ILoggerLevel;
export type LoggerLevel = ILoggerLevel | 'silly' | 'debug' | 'info' | 'warn' | 'error' | 'none';

export interface MetaInfo {
  level: string;
  message: string;
  timestamp: string;
  hostname: string;
  pid: number;
  ms: string;
  module: string;
  [key: string]: any;
}

export type FormatterFunction = (info: MetaInfo) => MetaInfo;

interface LoggerOptions {
  name?: string;
  filePath?: string;
  formatter?: FormatterFunction;
  consoleFormatter?: FormatterFunction;
  consoleLevel?: LoggerLevel;
  json?: boolean;
}

interface Logger {
  error(...message: any[]): Logger;
  warn(...message: any[]): Logger;
  info(...message: any[]): Logger;
  debug(...message: any[]): Logger;
}

/**
 * CWLogger
 * @example
 * ```js
 * const logger = new Logger({
 *   name: 'app';
 *   filePath:'./logs';
 *   consoleLevel: 'error';
 * });
 * logger.info('foo');
 * ```
 *
 * @export
 * @class CWLogger
 */
export class CWLogger implements Logger {
  /**
   *Creates an instance of CWLogger.
   * @param {LoggerOptions} options logger options assign with `defaultOptions` propery
   * - {String} name - log name,default `app`
   * - {String} filePath - log file path default `./logs`
   * - {FormatterFunction} formatter - log file formatter
   * - {FormatterFunction} consoleFormatter - console formatter default formatter
   * - {String} consoleLevel - log console level,default `info`
   * @memberof CWLogger
   */
  constructor(options?: LoggerOptions);

  /**
   * get logger
   *
   * @param {string} name logger module name
   * @returns {Logger} logger
   * @memberof CWLogger
   */
  get(name: string): Logger;

  /**
   * set logger
   *
   * @param {string} name logger module name
   * @returns {Logger} logger
   * @memberof CWLogger
   */
  set(name: string): Logger;

  /**
   * error log
   *
   * @param {...any[]} message
   * @returns {Logger}
   * @memberof CWLogger
   */
  error(...message: any[]): Logger;
  /**
   * warn log
   *
   * @param {...any[]} message
   * @returns {Logger}
   * @memberof CWLogger
   */
  warn(...message: any[]): Logger;
  /**
   * info log
   *
   * @param {...any[]} message
   * @returns {Logger}
   * @memberof CWLogger
   */
  info(...message: any[]): Logger;
  /**
   * debug log
   *
   * @param {...any[]} message
   * @returns {Logger}
   * @memberof CWLogger
   */
  debug(...message: any[]): Logger;
}
