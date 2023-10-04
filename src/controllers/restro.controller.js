import { Restro } from "../models/restros/restaurant.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import Config from "../config/index.js"
import redisClient from "../config/redis/index.js"
import { asyncHandler } from "../utils/asyncHandler.js"

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
