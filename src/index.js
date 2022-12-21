// Import express framework
import express from 'express'

// Import a external package named `uuid` to generate random string as id
import { v4 as randomID } from 'uuid'

// Initialize Express app
const app = express()

// Using json / body parser
app.use(express.json())

// Define PORT
const PORT = 8000

// Define persons array outside request scope
const persons = []

// Home route
app.get('/', (req, res) => {
  res.send('Hello')
})

// Sample post request
app.post('/', (req, res) => {
  // Get data from request body
  const data = req.body

  // Log / Print the data to the server console
  console.log(data)

  // Response client that the request is success
  res.send('DONE')
})

// Get all persons
app.get('/persons', (req, res) => {
  // response all the persons from `persons` array
  res.json(persons)
})

// Return person details by id

app.get('/persons/:id', (req, res) => {
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
app.post('/persons', (req, res) => {
  // get request body from user
  const { name, age } = req.body

  // Create a unique id for the person
  const id = randomID()

  // Push person data to persons array
  persons.push({ id: id, name: name, age: age })

  // res back person data and a message that the person is created
  res.json({ id: id, name: name, age: age, message: 'person created' })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
