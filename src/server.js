import app from './app.js';
import Config from './config/index.js';
import logger from './config/logger.js';
import connectDB from './config/db/index.js';

const { PORT } = Config;

async function startServer () {
    try {
        await connectDB();
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
