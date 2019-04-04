const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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

  app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(request.headers)

    if (!body.name) {
      return response.status(400).json({error:'nimi puuttuu!'})
    }
    if (persons.find(p=> p.name === body.name)) {
      return response.status(400).json({ error: 'nimi on jo listalla!' })
    }
    if (!body.number) {
      return response.status(400).json({error:'numero puuttuu!'})
    }
  
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
      
    }
  
    persons = persons.concat(person)
  
    response.json(person)
    
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
  
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
    return maxId + 1
  }


const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})