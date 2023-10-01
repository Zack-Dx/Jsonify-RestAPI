import { asyncHandler } from "../utils/asyncHandler.js"
import Config from "../config/index.js"
import redisClient from "../config/redis/index.js"
import { ApiError } from "../utils/ApiError.js"
import { Devs } from "../models/developer.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"

export const listUsers = asyncHandler(async (req, res) => {
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
  await redisClient.expire(`${cachePrefix} all`, Config.REDIS_TTL)
  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"))
})

export const createUser = asyncHandler(async (req, res) => {
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
  const user = await Devs.create({
    name,
    email,
    avatarUrl,
    description,
    location,
    skills,
    experience,
    githubProfile,
  })
  return res
    .status(201)
    .json(new ApiResponse(201, user, "Information submitted successfully"))
})

export const findUserById = asyncHandler(async (req, res) => {
  const cachePrefix = "user:"
  const userId = req.params.id
  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    throw new ApiError(400, null, "Invalid user ID Format")
  }
  const cachedUserData = await redisClient.get(`${cachePrefix}${userId}`)
  if (cachedUserData) {
    const cachedUser = JSON.parse(cachedUserData)
    return res
      .status(200)
      .json(new ApiResponse(200, cachedUser, "User fetched successfully"))
  }

  const user = await Devs.findById(userId)
  if (!user) {
    throw new ApiError(404, "User not found")
  }
  await redisClient.set(`user:${userId}`, JSON.stringify(user))
  await redisClient.expire(`user:${userId}`, Config.REDIS_TTL)
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"))
})
