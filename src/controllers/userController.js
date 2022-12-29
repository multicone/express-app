import { User } from "../models/User.js"

async function getUsers(req, res) {
  const users = await User.find().exec()
  res.status(200).json(users)
}

async function createUser(req, res) {
  const { name, email, phoneNumber } = req.body

  const user = await User.create({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
  })

  res.status(201).json(user)
}

async function getUserByID(req, res) {
  const { id } = req.params

  const user = await User.findById(id).exec()

  res.json(user)
}

async function updateUser(req, res) {
  const { id } = req.params
  const { name, email, phoneNumber } = req.body

  const existingUser = await User.findById(id)

  existingUser.name = name || existingUser.name
  existingUser.email = email || existingUser.email
  existingUser.phoneNumber = phoneNumber || existingUser.phoneNumber

  existingUser.save()

  res.status(200).json(existingUser)
}

async function deleteUser(req, res) {
  const { id } = req.params
  //   const user = await User.findByIdAndDelete(id).exec()
  User.findByIdAndDelete(id)
    .exec()
    .then(user => {
      res.json({
        message: "User has been deleted",
        user: user,
      })
    })
    .catch(err => {
      throw new Error("Failed to delete")
    })
}

export { getUsers, getUserByID, createUser, updateUser, deleteUser }
