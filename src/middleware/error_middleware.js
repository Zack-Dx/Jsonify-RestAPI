import mongoose from 'mongoose';
import Config from '../config/index.js';
import { ApiError } from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error ? 400 : 500;
        const message = error.message || 'Something went wrong';
        error = new ApiError(
            statusCode,
            message,
            error?.errors || [],
            err.stack
        );
    }

    const response = {
        ...error,
        message: error.message,
        ...(Config.NODE_ENV === 'development' ? { stack: error.stack } : {}), // Error stack traces should be visible in development for debugging
    };

    return res.status(error.statusCode).json(response);
};

export { errorHandler };
