/**
 * Represents a standardized API response format with status code, data, and a message.
 *
 * @class ApiResponse
 */

export const ApiResponse = class {
  /**
   * Creates a new ApiResponse instance.
   *
   * @param {number} statusCode - The HTTP status code of the response.
   * @param {any} data - The data to be included in the response.
   * @param {string} message - An optional message describing the response (default is "Success").
   */
  constructor (statusCode, data, message = "Success") {
    this.statusCode = statusCode
    this.data = data
    this.message = message
    this.success = statusCode < 400
  }
}
