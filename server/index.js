const express = require("express")
const path = require('path')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname, '../client/build')))

const todos = [
  { 
    id: 1,
    title: 'Get Data',
    isCompleted: false,
    order: 1, 
  },
  {
    id: 2,
    title: 'Create Todo',
    isCompleted: false,
    order: 2,
  },
  {
    id: 3,
    title: 'Create API',
    isCompleted: false,
    order: 3,
  },
  {
    id: 4,
    title: 'Fix bugs',
    isCompleted: false,
    order: 4,
  },
]



app.get("/api", (req, res) => {
  res.status(200).send(todos)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})