import { Router } from "express"
import {
  findRestroById,
  listRestros,
  editRestro,
  deleteRestro,
  addRestro,
} from "../controllers/restro.controller.js"

const restroRouter = Router()

restroRouter.route("/restros").get(listRestros).post(addRestro)

restroRouter
  .route("/restros/:id")
  .get(findRestroById)
  .put(editRestro)
  .patch(editRestro)
  .delete(deleteRestro)

export default restroRouter
