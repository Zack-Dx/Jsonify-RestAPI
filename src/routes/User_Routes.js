import { Router } from "express"
import { listUsers, createUser } from "../controllers/User_Controller.js"

const router = Router()

router.route("/users").get(listUsers).post(createUser)
export default router
