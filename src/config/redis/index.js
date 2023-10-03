import Redis from "ioredis"
import Config from "../index.js"

const { REDIS_AUTH, REDIS_HOST, REDIS_PORT } = Config

const redis = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST,
  password: REDIS_AUTH,
})

export default redis
