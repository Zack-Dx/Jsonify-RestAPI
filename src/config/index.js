import { config } from "dotenv"

config()

const {
  APP_NAME,
  PORT,
  MONGODB_URI,
  NODE_ENV,
  CORS_ORIGIN,
  REDIS_PORT,
  REDIS_AUTH,
  REDIS_HOST,
  REDIS_TTL,
} = process.env

const Config = {
  APP_NAME,
  PORT,
  MONGODB_URI,
  NODE_ENV,
  CORS_ORIGIN,
  REDIS_PORT,
  REDIS_HOST,
  REDIS_AUTH,
  REDIS_TTL,
}

export default Config
