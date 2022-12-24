import express from "express"
import { User } from "../models/User.js"

const userRouter = express.Router()

userRouter.get("/users", async (req, res) => {
  const users = await User.find().exec()
  res.status(200).json(users)
})

userRouter.post("/users", async (req, res) => {
  const { name, email, phoneNumber } = req.body

  if (!name || !email || !phoneNumber) {
    throw new Error("Please fill all fields")
  }

  const user = await User.create({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
  })

  res.status(201).json(user)
})

userRouter.get("/users/:id", async (req, res) => {
  const { id } = req.params

  const user = await User.findById(id).exec()

  res.json(user)
})

userRouter.delete("/users/:id", async (req, res) => {
  const { id } = req.params

  const user = await User.findByIdAndDelete(id).exec()

  res.json({
    message: "User has been deleted",
    user: user,
  })
})

export { userRouter }
