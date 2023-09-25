import mongoose from 'mongoose';
import Config from '../index.js';
import logger from '../logger.js';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${Config.MONGODB_URI}/${Config.DB_NAME}`
        );
        logger.info(
            `☘️  MongoDB Connected! DB host: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        logger.error('MongoDB connection error: ', error.message);
        setTimeout(() => process.exit(1), 1000);
    }
};

export default connectDB;
