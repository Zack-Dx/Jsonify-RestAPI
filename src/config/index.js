import { config } from 'dotenv';

config();
const Config = {
    APP_NAME: process.env.APP_NAME,
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV,
};

export default Config;
