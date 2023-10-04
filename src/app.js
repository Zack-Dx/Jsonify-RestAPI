import express from "express"
import cors from "cors"
import devRouter from "./routes/dev.routes.js"
import restroRouter from "./routes/restro.routes.js"
import Config from "./config/index.js"
import { errorHandler } from "./middleware/error.middleware.js"
import { rateLimiter } from "./config/limiter/index.js"

const app = express()
const { CORS_ORIGIN } = Config

// Global Middlewares
app.set("trust proxy", 1)
app.use(
  cors({
    origin: CORS_ORIGIN,
  })
)
app.use(rateLimiter)
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// Routers
app.use(devRouter)
app.use(restroRouter)
app.use(errorHandler)

export default app
