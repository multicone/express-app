// Import express framework
import express from "express"
import "express-async-errors"
import dotenv from "dotenv"
import { userRouter } from "./routes/userRouter.js"

dotenv.config()

import { connectDB } from "./database.js"

// Initialize Express app
const app = express()

// Using json / body parser
app.use(express.json())

app.use(userRouter)

// Define PORT
const PORT = process.env.PORT

connectDB()

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

// A middleware that takes 4 args , if any route has error it will execute at the end.
function errorHandler(err, req, res, next) {
  if (err) {
    const error = {
      message: err.message,
    }

    if (process.env.NODE_ENV !== "production") {
      error.stack = err.stack
    }

    res.status(400).json(error)
  }
}

// use error handler
app.use(errorHandler)
