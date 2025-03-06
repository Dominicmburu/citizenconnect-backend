// utils/logger.js
const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
  level: 'info',  // Set default logging level
  format: winston.format.combine(
    winston.format.colorize(),  // Add color to the logs
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console(),  // Log to the console
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),  // Log errors to file
    new winston.transports.File({ filename: 'logs/combined.log' })  // Log all info to file
  ],
});

// Log an info-level message
const logInfo = (message) => {
  logger.info(message);
};

// Log an error-level message
const logError = (message) => {
  logger.error(message);
};

module.exports = { logInfo, logError };
