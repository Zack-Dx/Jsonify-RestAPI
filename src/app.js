import express from "express"
import cors from "cors"
import router from "./routes/User_Routes.js"
import Config from "./config/index.js"
import { errorHandler } from "./middleware/error_middleware.js"
import { rateLimiter } from "./config/limiter/index.js"

const app = express()

// Global Middlewares
app.use(
  cors({
    origin: Config.CORS_ORIGIN,
  })
)
app.use(rateLimiter)
app.use(router)
app.use(errorHandler)

export default app
