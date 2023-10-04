import { Router } from "express"
import { listRestros } from "../controllers/restro.controller.js"

const restroRouter = Router()

restroRouter.route("/restros").get(listRestros)

export default restroRouter
