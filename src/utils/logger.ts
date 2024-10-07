// logger.ts
import { createLogger, format, transports } from 'winston';

// Define a custom format for logs (optional)
const customFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create and export the logger instance
export const logger = createLogger({
  level: 'info', // Set the default log level
  format: format.combine(
    format.timestamp(), // Add timestamp to logs
    customFormat        // Use custom format
  ),
  transports: [
    new transports.Console(),                   // Log to the console
    new transports.File({ filename: 'app.log' }) // Log to a file
  ]
});
