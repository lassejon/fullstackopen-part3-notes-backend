require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

const app = express()

// use
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// get
app.get('/', (req, res) => {
  res.send('<h1>Hello Notebook!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note
    .find({})
    .then(notes => {
      response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

//post
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

// delete
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})