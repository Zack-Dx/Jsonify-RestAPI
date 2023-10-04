import { Router } from "express"
import {
  listUsers,
  addUser,
  findUserById,
} from "../controllers/dev.controller.js"

const devRouter = Router()

devRouter.route(`/users`).get(listUsers).post(addUser)

devRouter.route("/users/:id").get(findUserById)

export default devRouter
