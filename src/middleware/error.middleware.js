import mongoose from "mongoose"
import Config from "../config/index.js"
import { ApiError } from "../utils/ApiError.js"

const { NODE_ENV } = Config

/**
 * Express error handling middleware that centralizes error response generation.
 * It handles both known API errors (instances of ApiError) and other unhandled errors.
 * When handling unhandled errors, it assigns a default status code of 500 (Internal Server Error).
 * In development mode, it includes the error stack trace in the response.
 *
 * @param {Error} err - The error object, which may be an instance of ApiError or an unhandled error.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @returns {Object} - An HTTP JSON response object with the appropriate status code and error details.
 */

export const errorHandler = (err, req, res, next) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500
    const message = error.message || "Something went wrong"
    error = new ApiError(statusCode, message, error?.errors || [], err.stack)
  }

  const response = {
    ...error,
    message: error.message,
    ...(NODE_ENV === "development" ? { stack: error.stack } : {}),
  }

  return res.status(error.statusCode).json(response)
}
