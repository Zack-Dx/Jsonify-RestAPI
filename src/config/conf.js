import { config } from 'dotenv';

config();
const Config = {
    PORT: process.env.PORT,
    MONGO_DB_URI: process.env.MONGO_DB_URI,
};

export default Config;
