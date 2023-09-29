import Config from '../index.js';
import { transports, createLogger, format } from 'winston';
import 'winston-daily-rotate-file';

const { DailyRotateFile, Console } = transports;
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
});

const prodLogger = () => {
    return createLogger({
        level: 'info',
        defaultMeta: {
            appName: Config.APP_NAME,
            environment: Config.NODE_ENV,
        },
        transports: [
            new DailyRotateFile({
                dirname: 'logs',
                filename: 'combined.log',
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '10m',
                maxFiles: '7d',
                level: 'info',
                silent: false,
            }),
            new DailyRotateFile({
                dirname: 'logs',
                filename: 'error.log',
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '10m',
                maxFiles: '7d',
                level: 'error',
                silent: false,
            }),
            new Console({
                level: 'info',
                format: combine(timestamp(), myFormat),
            }),
        ],
    });
};

export default prodLogger;
