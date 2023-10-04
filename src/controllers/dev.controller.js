import { asyncHandler } from "../utils/asyncHandler.js"
import Config from "../config/index.js"
import redisClient from "../config/redis/index.js"
import { ApiError } from "../utils/ApiError.js"
import { Devs } from "../models/developer/developer.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { validateMongoId } from "../utils/helper.js"

const { REDIS_TTL } = Config

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

export const addDev = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    avatarUrl,
    description,
    location,
    skills,
    experience,
    githubProfile,
  } = req.body
  if (
    !name ||
    !email ||
    !avatarUrl ||
    !description ||
    !location ||
    !skills ||
    !experience ||
    !githubProfile
  ) {
    throw new ApiError(400, "Missing required fields")
  }

  const userExists = await Devs.findOne({
    $or: [{ name }, { email }, { avatarUrl }, { githubProfile }],
  })

  if (userExists) {
    throw new ApiError(
      409,
      "User with any of the provided credentials already exists"
    )
  }
  const user = {
    name,
    email,
    avatarUrl,
    description,
    location,
    skills,
    experience,
    githubProfile,
  }
  return res
    .status(201)
    .json(new ApiResponse(201, user, "User created successfully"))
})

export const editDev = asyncHandler(async (req, res) => {
  const devId = req.params.id
  if (!validateMongoId(devId)) {
    throw new ApiError(400, "Invalid user ID Format")
  }
  const {
    name,
    email,
    avatarUrl,
    description,
    location,
    skills,
    experience,
    githubProfile,
  } = req.body
  if (
    !name ||
    !email ||
    !avatarUrl ||
    !description ||
    !location ||
    !skills ||
    !experience ||
    !githubProfile
  ) {
    throw new ApiError(400, "Missing required fields")
  }

  const dev = await Devs.findById(devId)
  if (!dev) {
    throw new ApiError(404, "User not found")
  }

  const updatedDev = {
    name,
    email,
    avatarUrl,
    description,
    location,
    skills,
    experience,
    githubProfile,
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedDev, "User updated successfully"))
})

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
