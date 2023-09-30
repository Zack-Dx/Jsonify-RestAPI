import { asyncHandler } from "../utils/asyncHandler.js"
// import redis from '../config/redis/index.js';
import { ApiError } from "../utils/ApiError.js"
import { Devs } from "../models/developer_model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
// import { ApiResponse } from '../utils/ApiResponse.js';

export const listUsers = asyncHandler(async (req, res) => {
  const users = await Devs.find()
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
    linkedinProfile,
  } = req.body
  if (
    !name ||
    !email ||
    !avatarUrl ||
    !description ||
    !location ||
    !skills ||
    !experience ||
    !githubProfile ||
    !linkedinProfile
  ) {
    throw new ApiError(400, "Missing required fields")
  }

  const userExists = await Devs.findOne({
    $or: [
      { name },
      { email },
      { avatarUrl },
      { githubProfile },
      { linkedinProfile },
    ],
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
    linkedinProfile,
  })
  return res
    .status(201)
    .json(new ApiResponse(201, user, "Information submitted successfully"))
})
