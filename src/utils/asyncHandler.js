/**
 * A middleware function that wraps an asynchronous request handler, allowing it to handle promises and errors seamlessly.
 *
 * @param {Function} requestHandler - The asynchronous request handler function that this middleware wraps.
 *
 * @returns {Function} - A middleware function that handles promises and forwards errors to the next middleware.
 */

export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      next(err)
    })
  }
}
