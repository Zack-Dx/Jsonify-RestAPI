import Config from "../../config/index.js"
import devLogger from "./devLogger.js"
import prodLogger from "./prodLogger.js"

const { NODE_ENV } = Config
let logger = null

if (NODE_ENV !== "production") {
  logger = devLogger()
}
if (NODE_ENV === "production") {
  logger = prodLogger()
}

export default logger
