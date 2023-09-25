import { config } from 'dotenv';

config();

const { PORT } = process.env;
const { MONGO_DB_URI } = process.env;

export default { PORT, MONGO_DB_URI };
