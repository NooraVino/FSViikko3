const express = require('express')
const app = express()

let persons = [
    {
      id: 1,
      name: 'Arto Hellas',
      number: '040-636363',
    
    },
    {
      id: 2,
      name: 'Arttu Viskari',
      number: '056-84848484',
    },
    {
      id: 3,
      name: 'Jaahas',
      number: '83838-030303'
    
    },
  ]
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
  })

  app.get('/info', (req, res) => {
    res.json('luettelossa on ' + persons.length + ' henkilöä' + new Date())
  })



const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})