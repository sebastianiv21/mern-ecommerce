import express from 'express'
import dotenv from 'dotenv'
// Para usar el tipo de import de ES7 se debe agregar "type": "module" al package.json y cuando se importe un archivo, se debe agregar la extensión del archivo
import products from './data/products.js'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  // Encuentra el producto por id usando el objecto req
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
