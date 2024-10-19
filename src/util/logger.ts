import winston from "winston";
import newrelic from "newrelic";
import "../newrelic";

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug",
    }),
    new winston.transports.File({ filename: "debug.log", level: "debug" }),
  ],
};

const logger = winston.createLogger(options);

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
    log: (info, callback) => {
      newrelic.recordCustomEvent("Logging", {
        level: info.level,
        message: info.message,
      });
      callback();
    },
  })
);

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

const logWithContext = (
  level: string,
  message: string,
  context?: Record<string, any>
) => {
  logger.log(level, message);
  newrelic.addCustomAttributes(context || {});
  newrelic.recordCustomEvent("Log", {
    level,
    message,
    ...context,
  });
};

export default {
  error: (message: string, context?: Record<string, any>) =>
    logWithContext("error", message, context),
  warn: (message: string, context?: Record<string, any>) =>
    logWithContext("warn", message, context),
  info: (message: string, context?: Record<string, any>) =>
    logWithContext("info", message, context),
  debug: (message: string, context?: Record<string, any>) =>
    logWithContext("debug", message, context),
};
