/**
 * Validates a string to check if it represents a valid MongoDB ObjectID.
 *
 * @param {string} id - The string to be validated as a potential MongoDB ObjectID.
 *
 * @returns {boolean} - `true` if the string is a valid MongoDB ObjectID, `false` otherwise.
 */

export const validateMongoId = (id) => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) return true
  else return false
}
