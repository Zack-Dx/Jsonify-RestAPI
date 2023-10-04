import { Router } from "express"
import { listDevs, addDev, findDevById } from "../controllers/dev.controller.js"

const devRouter = Router()

devRouter.route(`/devs`).get(listDevs).post(addDev)

devRouter.route("/devs/:id").get(findDevById)

export default devRouter
