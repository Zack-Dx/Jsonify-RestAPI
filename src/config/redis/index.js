import Redis from 'ioredis';
import Config from '../index.js';

const redis = new Redis({
    port: Config.REDIS_PORT,
    host: Config.REDIS_HOST,
});

export default redis;
