import express from "express"
import cors from "cors"
import router from "./routes/dev.routes.js"
import Config from "./config/index.js"
import { errorHandler } from "./middleware/error.middleware.js"
import { rateLimiter } from "./config/limiter/index.js"

const app = express()

// Global Middlewares
app.set("trust proxy", 1)
app.use(
  cors({
    origin: Config.CORS_ORIGIN,
  })
)
app.use(rateLimiter)
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(router)
app.use(errorHandler)

export default app
