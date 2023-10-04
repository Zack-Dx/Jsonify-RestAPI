import { Router } from "express"
import {
  findRestroById,
  listRestros,
} from "../controllers/restro.controller.js"

const restroRouter = Router()

restroRouter.route("/restros").get(listRestros)

restroRouter.route("/restros/:id").get(findRestroById)

export default restroRouter
