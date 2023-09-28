import Config from './index.js';
import winston from 'winston';
import 'winston-daily-rotate-file';

const logger = winston.createLogger({
    level: 'info',
    defaultMeta: {
        appName: Config.APP_NAME,
    },
    transports: [
        new winston.transports.DailyRotateFile({
            dirname: 'logs',
            filename: 'combined.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '10m',
            maxFiles: '7d',
            level: 'info',
            silent: false,
        }),
        new winston.transports.DailyRotateFile({
            dirname: 'logs',
            filename: 'error.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '10m',
            maxFiles: '7d',
            level: 'error',
            silent: false,
        }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        }),
    ],
});

export default logger;
