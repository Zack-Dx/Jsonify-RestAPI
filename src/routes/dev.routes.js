import { Router } from "express"
import {
  listDevs,
  addDev,
  findDevById,
  editDev,
  deleteDev,
} from "../controllers/dev.controller.js"

const devRouter = Router()

devRouter.route(`/devs`).get(listDevs).post(addDev)

devRouter
  .route("/devs/:id")
  .get(findDevById)
  .put(editDev)
  .patch(editDev)
  .delete(deleteDev)

export default devRouter
