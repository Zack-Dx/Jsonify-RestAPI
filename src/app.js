import express from 'express';
import router from './routes/User_Routes.js';
import { errorHandler } from './middleware/error_middleware.js';
import rateLimiter from './config/limiter.js';

const app = express();

app.use(rateLimiter);
app.use(router);
app.use(errorHandler);

export default app;
