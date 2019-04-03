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

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})