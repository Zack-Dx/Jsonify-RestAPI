import { Router } from "express"
import {
  listUsers,
  createUser,
  findUserById,
} from "../controllers/User_Controller.js"

const router = Router()

router.route("/users").get(listUsers).post(createUser)

router.route("/users/:id").get(findUserById)

export default router
