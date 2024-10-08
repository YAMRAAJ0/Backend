import { createLogger, format, transports } from 'winston';

// Define a custom format for logs (optional)
const customFormat = format.printf(({ level, message, timestamp, stack }) => {
  return stack
    ? `${timestamp} [${level.toUpperCase()}]: ${message}\n${stack}`
    : `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create and export the logger instance
export const logger = createLogger({
  level: 'info', // Set the default log level
  format: format.combine(
    format.timestamp(), // Add timestamp to logs
    customFormat        // Use custom format
  ),
  transports: [
    new transports.Console(),                     // Log to the console
    new transports.File({ filename: 'app.log' }) // Log to a file
  ]
});

// Function to log errors
export const logError = (error: Error) => {
  logger.error(error.message, { stack: error.stack });
};

// Example usage
// You can use this function to log errors throughout your application.
// try {
//   // Some operation that may throw an error
// } catch (error) {
//   logError(error);
// }


// // logger.ts
// import { createLogger, format, transports } from 'winston';

// // Define a custom format for logs (optional)
// const customFormat = format.printf(({ level, message, timestamp }) => {
//   return `${timestamp} [${level.toUpperCase()}]: ${message}`;
// });

// // Create and export the logger instance
// export const logger = createLogger({
//   level: 'info', // Set the default log level
//   format: format.combine(
//     format.timestamp(), // Add timestamp to logs
//     customFormat        // Use custom format
//   ),
//   transports: [
//     new transports.Console(),                   // Log to the console
//     new transports.File({ filename: 'app.log' }) // Log to a file
//   ]
// });


