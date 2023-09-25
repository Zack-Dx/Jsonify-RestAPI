import Config from './index.js';
import winston from 'winston';

const logger = new winston.createLogger({
    level: 'info',
    defaultMeta: {
        appName: Config.APP_NAME,
    },
    transports: [
        new winston.transports.File({
            dirname: 'logs',
            filename: 'combined.log',
            level: 'info',
            silent: false,
        }),
        new winston.transports.File({
            dirname: 'logs',
            filename: 'error.log',
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
