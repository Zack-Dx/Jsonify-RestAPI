import { Router } from "express"
import {
  listUsers,
  createUser,
  findUserById,
} from "../controllers/dev.controller.js"

const router = Router()

router.route("/users").get(listUsers).post(createUser)

router.route("/users/:id").get(findUserById)

export default router
