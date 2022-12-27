// Import express framework
import express from "express"
import "express-async-errors"
import dotenv from "dotenv"
import { userRouter } from "./routes/userRouter.js"

dotenv.config()

import { connectDB } from "./database.js"
import { CustomError } from "./errors/custom-errors.js"
import { NotFoundError } from "./errors/not-found-errors.js"

// Initialize Express app
const app = express()

// Using json / body parser
app.use(express.json())

app.use(userRouter)

app.get("/test", (req, res) => {
  throw new CustomError("An error ")
})

app.all("*", (req, res) => {
  throw new NotFoundError()
})

// Define PORT
const PORT = process.env.PORT

connectDB()

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

// A middleware that takes 4 args , if any route has error it will execute at the end.
function errorHandler(err, req, res, next) {
  if (err instanceof CustomError) {
    if (process.env.NODE_ENV !== "production") {
      console.error(err.stack)
    }
    res.status(err.statusCode).json(err.serializeErrors())
  }
}

// use error handler
app.use(errorHandler)
