import app from './app.js';
import Config from './config/conf.js';

const { PORT } = Config;

function startServer () {
    try {
        app.listen(PORT, () => {
            console.log(`Server is listening on ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

startServer();
