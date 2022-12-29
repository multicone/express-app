import express from "express"
import {
  createUser,
  deleteUser,
  getUserByID,
  getUsers,
  updateUser,
} from "../controllers/userController.js"
import { validateUserMiddleware } from "../middleware/user-validation.middleware.js"

const userRouter = express.Router()

userRouter.get("/users", getUsers)

userRouter.post("/users", validateUserMiddleware, createUser)

userRouter.get("/users/:id", getUserByID)

userRouter.patch("/users/:id", updateUser)

userRouter.delete("/users/:id", deleteUser)

export { userRouter }
