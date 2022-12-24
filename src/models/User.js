import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // default : "test@test.com"
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
})

export const User = mongoose.model("User", userSchema)
