require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(express.static('build'))



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
  app.get('/info', (req, res) => {
    Person.find({}).then(persons=> {
      res.json('luettelossa on ' + persons.length + ' henkilöä   ' + new Date())  
    })
    
  })
  
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons=> {
      response.json(persons.map(p => p.toJSON()))
    })
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
      return response.status(400).json({error:'nimi puuttuu!'})
    }
    if (persons.find(p=> p.name === body.name)) {
      return response.status(400).json({ error: 'nimi on jo listalla!' })
    }
    if (!body.number) {
      return response.status(400).json({error:'numero puuttuu!'})
    }
  
    const person = new Person({
      id: generateId(),
      name: body.name,
      number: body.number,
      
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson.toJSON())
    })   
  })
  

  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).send({ error: 'id oikeassa muodossa mutta ei vastaavuuksia' })
      }
    })
    .catch(error => next(error))
  })

  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      if(result){
      response.status(204).end()
      } else {
        response.status(404).send({error: 'ei vastaavuuksia, ehkä tämä id on jo poistettu?'}) 
      }
    })
   
    .catch(error => next(error))


})
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
    return maxId + 1
  }
  

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'id väärässä muodossa' })
    } 
  
    next(error)
  }
  
  app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})