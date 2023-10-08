import { Restro } from "../models/restros/restaurant.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import Config from "../config/index.js"
import redisClient from "../config/redis/index.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { validateMongoId } from "../utils/helper.js"
import { restroValidationSchema } from "../utils/schemaValidation.js"

const { REDIS_TTL } = Config

export const listRestros = asyncHandler(async (req, res) => {
  const cachePrefix = "restros:"
  const cachedValue = await redisClient.get(`${cachePrefix} all`)
  if (cachedValue) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          JSON.parse(cachedValue),
          "Restros fetched successfully"
        )
      )
  }
  const restros = await Restro.find()
  await redisClient.set(`${cachePrefix} all`, JSON.stringify(restros))
  await redisClient.expire(`${cachePrefix} all`, REDIS_TTL)

  return res
    .status(200)
    .json(new ApiResponse(200, restros, "Restros fetched successfully"))
})

export const findRestroById = asyncHandler(async (req, res) => {
  const cachePrefix = "restro:"
  const restroId = req.params.id
  if (!validateMongoId(restroId)) {
    throw new ApiError(400, "Invalid restro ID Format")
  }
  const cachedRestroData = await redisClient.get(`${cachePrefix}${restroId}`)
  if (cachedRestroData) {
    const cachedRestro = JSON.parse(cachedRestroData)
    return res
      .status(200)
      .json(new ApiResponse(200, cachedRestro, "Restro fetched successfully"))
  }
  const restro = await Restro.findById(restroId)
  if (!restro) {
    throw new ApiError(404, "Restro not found")
  }
  await redisClient.set(`${cachePrefix}${restroId}`, JSON.stringify(restro))
  await redisClient.expire(`${cachePrefix}${restroId}`, REDIS_TTL)

  return res
    .status(200)
    .json(new ApiResponse(200, restro, "Restro fetched successfully"))
})

export const addRestro = asyncHandler(async (req, res) => {
  const requestData = req.body
  const { error, value } = restroValidationSchema.validate(requestData)
  if (error) {
    throw new ApiError(400, null, error.details[0].message)
  }
  const { info } = value
  const restroExists = await Restro.findOne({
    $or: [{ "info.name": info.name }, { "info.imageUrl": info.imageUrl }],
  })
  if (restroExists) {
    throw new ApiError(
      409,
      "Restro with any of the provided credentials already exists"
    )
  }

  return res
    .status(201)
    .json(new ApiResponse(201, value, "Restro added successfully"))
})

export const editRestro = asyncHandler(async (req, res) => {
  const restroId = req.params.id
  const requestData = req.body
  if (!validateMongoId(restroId)) {
    throw new ApiError(400, "Invalid restro ID Format")
  }
  const { error, value } = restroValidationSchema.validate(requestData)
  if (error) {
    throw new ApiError(400, null, error.details[0].message)
  }
  const restro = await Restro.findById(restroId)
  if (!restro) {
    throw new ApiError(404, "Restro not found")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, value, "Restro details updated successfully"))
})

export const deleteRestro = asyncHandler(async (req, res) => {
  const restroId = req.params.id
  if (!validateMongoId(restroId)) {
    throw new ApiError(400, "Invalid restro ID Format")
  }
  const deletedRestro = await Restro.findById(restroId)
  if (!deletedRestro) {
    throw new ApiError(404, "Restro not found")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedRestro, "Restro deleted successfully"))
})
