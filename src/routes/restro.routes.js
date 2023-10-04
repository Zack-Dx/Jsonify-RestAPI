import { Router } from "express"
import {
  findRestroById,
  listRestros,
  editRestro,
  deleteRestro,
} from "../controllers/restro.controller.js"

const restroRouter = Router()

restroRouter.route("/restros").get(listRestros)

restroRouter
  .route("/restros/:id")
  .get(findRestroById)
  .put(editRestro)
  .patch(editRestro)
  .delete(deleteRestro)

export default restroRouter
