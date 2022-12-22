// Import express framework
import express from "express"

// Import a external package named `uuid` to generate random string as id
import { v4 as randomID } from "uuid"

import { sub, sum } from "./sum.js"

// Initialize Express app
const app = express()

// Using json / body parser
app.use(express.json())
app.use(testMiddleware)

// Define PORT
const PORT = 8000

// Define persons array outside request scope
const persons = []

// Home route
app.get("/", (req, res) => {
  res.send("Hello")
})

// Sample post request
app.post("/", (req, res) => {
  // Get data from request body
  const data = req.body

  // Log / Print the data to the server console
  console.log(data)

  // Response client that the request is success
  res.send("DONE")
})

// Get all persons
app.get("/persons", (req, res) => {
  // response all the persons from `persons` array
  res.json(persons)
})

// Return person details by id

app.get("/persons/:id", (req, res) => {
  // Get id from request parameters
  const { id } = req.params

  // find person by id from persons array
  const existingPerson = persons.find(person => {
    return person.id === id
  })

  // TODO: Array Operation: map, filter, find, findIndex , reduce

  // return person
  res.json(existingPerson)
})

// Create a new Person
app.post("/persons", (req, res) => {
  // get request body from user
  const { name, age } = req.body

  // Create a unique id for the person
  const id = randomID()
  // Throw error if age is not in the request body
  if (!age) {
    throw new Error("Age is required")
  }

  // Push person data to persons array
  persons.push({ id: id, name: name, age: age })

  // res back person data and a message that the person is created
  res.json({ id: id, name: name, age: age, message: "person created" })
})

app.get("/sum", (req, res) => {
  
  // Try Catch block
  // If the statement inside try block fails
  // Catch block will execute
  try {
    
    // Get x and y query params from url
    const { x, y } = req.query
    // Call sum function (imported from different file)
    const sumResult = sum(x, y)
    // Return response
    res.json({
      result: sumResult,
    })
    
  } catch (error) {
    // If the try block has any error, throw a custom error
    throw new Error("Something went wrong")
  }
})

// same as previous method
app.get("/sub", (req, res) => {
  const { x, y } = req.query

  const subResult = sub(x, y)

  res.json({
    result: subResult,
  })
})

// request query to /sum route
// localhost:8000/sum?x=4&y=5

// get = data fetch
// post = data create
// put /patch = data edit / update
// delete = data delete

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

// A test middleware that takes 3 args 
// call next function to redirect the request to next function 
function testMiddleware(req, res, next) {
  const query = {
    x: req.query.x,
    y: req.query.y,
  }

  console.log(query)

  next()
}

// A middleware that takes 4 args , if any route has error it will execute at the end.
function errorHandler(err, req, res, next) {
  if (err) {
    res.status(400).json({
      message: err.message,
    })
  }
}

// use error handler 
app.use(errorHandler)
