import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

export const connectDB = () => {
  const connectionString = process.env.MONGODB_URI

  mongoose.connect(connectionString)

  const database = mongoose.connection

  database.on("error", () => {
    console.log("Failed to connect")
  })

  database.once("connected", () => {
    console.log("Database connected")
  })
}
