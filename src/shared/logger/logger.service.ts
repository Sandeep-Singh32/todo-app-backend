import { Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';

@Injectable({ scope: Scope.DEFAULT })
export class LoggerService {
  private readonly logger: winston.Logger;
  private context = 'Application';

  constructor() {
    this.logger = winston.createLogger({
      levels: winston.config.cli.levels,
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
      transports: [new winston.transports.Console({})],
    });
  }

  setContext(context: string) {
    this.context = context;
  }

  parseLogData(data: any[]) {
    data.forEach((dt, idx) => {
      if (typeof dt === 'object') {
        try {
          data[idx] = JSON.stringify(dt, null, 2);
        } catch (error) {
          // keep as it is.
        }
      }
    });
  }

  /**
   * Logs a debug message with optional data.
   * @param message The debug message to log.
   * @param data Additional data to include in the log.
   * @remarks Use this function to log detailed debug information during development or troubleshooting.
   */
  debug(message: string, ...data: any[]) {
    this.parseLogData(data);
    this.logger.log({
      context: this.context,
      level: 'debug',
      message: message,
      data: data.join(' '),
    });
  }
  /**
   * Logs an informational message.
   * @param message The informational message to log.
   * @remarks Use this function to log general information or progress updates.
   */

  info(message: string) {
    this.logger.log({
      context: this.context,
      level: 'info',
      message: message,
    });
  }

  /**
   * Logs an error message with optional priority level.
   * @param message The error message to log.
   * @param errors Additional error data.
   * @remarks Use this function to log errors and optionally specify their priority level.
   */

  error(message: string, ...errors: any[]) {
    this.logger.log({
      context: this.context,
      level: 'error',
      message: message,
      priority: 1,
      data: errors,
    });
  }

  /**
   * Logs a warning message.
   * @param message The warning message to log.
   * @remarks Use this function to log potential issues or warnings.
   */

  warn(message: string) {
    this.logger.log({
      context: this.context,
      level: 'warn',
      message: message,
    });
  }
}
