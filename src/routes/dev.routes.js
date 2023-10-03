import { Router } from "express"
import {
  listUsers,
  createUser,
  findUserById,
} from "../controllers/dev.controller.js"

const devRouter = Router()

devRouter.route(`/users`).get(listUsers).post(createUser)

devRouter.route("/users/:id").get(findUserById)

export default devRouter
