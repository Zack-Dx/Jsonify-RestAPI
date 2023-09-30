import { config } from "dotenv"

config()

const {
  APP_NAME,
  PORT,
  MONGODB_URI,
  NODE_ENV,
  CORS_ORIGIN,
  REDIS_PORT,
  REDIS_HOST,
} = process.env

const Config = {
  APP_NAME,
  PORT,
  MONGODB_URI,
  NODE_ENV,
  CORS_ORIGIN,
  REDIS_PORT,
  REDIS_HOST,
}

export default Config
