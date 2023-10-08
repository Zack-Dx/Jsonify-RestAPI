import Config from "../index.js"
import { transports, createLogger, format } from "winston"
import "winston-daily-rotate-file"

const { DailyRotateFile, Console } = transports
const { combine, timestamp, printf, colorize } = format
const { APP_NAME, NODE_ENV } = Config

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`
})

const devLogger = () => {
  return createLogger({
    level: "debug",
    defaultMeta: {
      appName: APP_NAME,
      environment: NODE_ENV,
    },
    transports: [
      new DailyRotateFile({
        dirname: "logs",
        filename: "combined.log",
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxSize: "10m",
        maxFiles: "2d",
        level: "info",
        silent: false,
      }),
      new DailyRotateFile({
        dirname: "logs",
        filename: "error.log",
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxSize: "10m",
        maxFiles: "2d",
        level: "error",
        silent: false,
      }),
      new Console({
        level: "info",
        format: combine(
          colorize(),
          timestamp({
            format: "HH:mm:ss",
          }),
          myFormat
        ),
      }),
    ],
  })
}

export default devLogger
