import Config from "../../config/index.js"
import devLogger from "./devLogger.js"
import prodLogger from "./prodLogger.js"

let logger = null

if (Config.NODE_ENV !== "production") {
  logger = devLogger()
}
if (Config.NODE_ENV === "production") {
  logger = prodLogger()
}

export default logger
