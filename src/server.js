import app from './app.js';
import Config from './config/index.js';
import logger from './config/logger/index.js';
import connectDB from './config/db/index.js';

const { PORT } = Config;

async function startServer () {
    try {
        await connectDB();
        const server = app.listen(PORT, () => {
            logger.info(`Listening on port ${PORT}`);
        });

        // Error handling for EADDRINUSE
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                logger.error(
                    `Port ${PORT} is already in use. Please choose another port.`
                );
            } else {
                logger.error('An error occurred:', error);
            }
            setTimeout(() => process.exit(1), 1000);
        });
    } catch (err) {
        if (err instanceof Error) {
            logger.error(err.message);
            setTimeout(() => process.exit(1), 1000);
        }
    }
}

startServer();
