import { asyncHandler } from "../utils/asyncHandler.js"
import Config from "../config/index.js"
import redisClient from "../config/redis/index.js"
import { ApiError } from "../utils/ApiError.js"
import { Devs } from "../models/developer/developer.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { validateMongoId } from "../utils/helper.js"
import { devValidationSchema } from "../utils/schemaValidation.js"

const { REDIS_TTL } = Config

/**
 * Fetches a list of developers (Devs) and returns it as a JSON response.
 * If the data is not cached, it is fetched from the database and stored in the cache for future use.
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @returns {Object} - An HTTP JSON response object with status and data.
 */

export const listDevs = asyncHandler(async (req, res) => {
  const cachePrefix = "users:"
  const cachedValue = await redisClient.get(`${cachePrefix} all`)
  if (cachedValue) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          JSON.parse(cachedValue),
          "Users fetched successfully"
        )
      )
  }
  const users = await Devs.find()
  await redisClient.set(`${cachePrefix} all`, JSON.stringify(users))
  await redisClient.expire(`${cachePrefix} all`, REDIS_TTL)

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"))
})

/**
 * Fetches a developer (Dev) by their unique identifier (ID) and returns it as a JSON response.
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @throws {ApiError} - Throws an API error with the appropriate status code and message in case of invalid ID format or when the user is not found.
 *
 * @returns {Object} - An HTTP JSON response object with status and data, indicating success or failure.
 */

export const findDevById = asyncHandler(async (req, res) => {
  const cachePrefix = "user:"
  const devId = req.params.id
  if (!validateMongoId(devId)) {
    throw new ApiError(400, "Invalid user ID Format")
  }
  const cachedUserData = await redisClient.get(`${cachePrefix}${devId}`)
  if (cachedUserData) {
    const cachedUser = JSON.parse(cachedUserData)
    return res
      .status(200)
      .json(new ApiResponse(200, cachedUser, "User fetched successfully"))
  }

  const dev = await Devs.findById(devId)
  if (!dev) {
    throw new ApiError(404, "User not found")
  }
  await redisClient.set(`${cachePrefix}${devId}`, JSON.stringify(dev))
  await redisClient.expire(`${cachePrefix}${devId}`, REDIS_TTL)

  return res
    .status(200)
    .json(new ApiResponse(200, dev, "User fetched successfully"))
})

/**
 * (MOCK USE)
 * Adds a new developer (Dev) to the database with the provided data and returns a JSON response.
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @throws {ApiError} - Throws an API error with the appropriate status code and message in case of validation errors or if a user with similar credentials already exists.
 *
 * @returns {Object} - An HTTP JSON response object with status and data, indicating success or failure.
 */

export const addDev = asyncHandler(async (req, res) => {
  const requestData = req.body
  const { error, value } = devValidationSchema.validate(requestData)
  if (error) {
    throw new ApiError(400, null, error.details[0].message)
  }
  const { name, email, avatarUrl, githubProfile } = value

  const userExists = await Devs.findOne({
    $or: [{ name }, { email }, { avatarUrl }, { githubProfile }],
  })

  if (userExists) {
    throw new ApiError(
      409,
      "User with any of the provided credentials already exists"
    )
  }

  return res
    .status(201)
    .json(new ApiResponse(201, value, "User created successfully"))
})

/**
 * (MOCK USE)
 * Edits an existing developer (Dev) in the database with the provided data and returns a JSON response.
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @throws {ApiError} - Throws an API error with the appropriate status code and message in case of invalid ID format, validation errors, or if the user is not found.
 *
 * @returns {Object} - An HTTP JSON response object with status and data, indicating success or failure.
 */

export const editDev = asyncHandler(async (req, res) => {
  const devId = req.params.id
  const requestData = req.body
  if (!validateMongoId(devId)) {
    throw new ApiError(400, "Invalid user ID Format")
  }
  const { error, value } = devValidationSchema.validate(requestData)
  if (error) {
    throw new ApiError(400, null, error.details[0].message)
  }
  const dev = await Devs.findById(devId)
  if (!dev) {
    throw new ApiError(404, "User not found")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, value, "User updated successfully"))
})

/**
 * (MOCK USE)
 * Deletes an existing developer (Dev) from the database based on the provided Dev ID and returns a JSON response.
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @throws {ApiError} - Throws an API error with the appropriate status code and message in case of an invalid ID format or if the user is not found.
 *
 * @returns {Object} - An HTTP JSON response object with status and data, indicating success or failure.
 */

export const deleteDev = asyncHandler(async (req, res) => {
  const devId = req.params.id
  if (!validateMongoId(devId)) {
    throw new ApiError(400, "Invalid user ID Format")
  }
  const deletedDev = await Devs.findById(devId)
  if (!deletedDev) {
    throw new ApiError(404, "User not found")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedDev, "User deleted successfully"))
})
