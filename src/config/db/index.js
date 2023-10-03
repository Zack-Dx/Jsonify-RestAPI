import mongoose from "mongoose"
import Config from "../index.js"
import logger from "../logger/index.js"

const { MONGODB_URI } = Config

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGODB_URI)
    logger.info(
      `☘️  MongoDB Connected! DB Host: ${connectionInstance.connection.host}`
    )
  } catch (error) {
    logger.error("MongoDB connection error: ", error.message)
    setTimeout(() => process.exit(1), 1000)
  }
}

export default connectDB
