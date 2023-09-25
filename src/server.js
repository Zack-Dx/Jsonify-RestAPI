import app from './app.js';
import Config from './config/index.js';
import logger from './config/logger.js';

const { PORT } = Config;

function startServer () {
    try {
        app.listen(PORT, () => {
            logger.info(`Listening on port ${PORT}`);
        });
    } catch (err) {
        if (err instanceof Error) {
            logger.error(err.message);
            setTimeout(() => process.exit(1), 1000);
        }
    }
}

startServer();
