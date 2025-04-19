// config/logger.js
const { createLogger, transports, format } = require("winston");
const morgan = require("morgan");

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
    new transports.Console({ format: format.simple() }),
  ],
});

// Add request logger using morgan
logger.requestLogger = morgan("dev");

module.exports = logger;
