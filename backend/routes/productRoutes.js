import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

// El asyncHandler me permite no tener que utilizar try catch para cada ruta

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    // Encuentra el producto por id usando el objecto req
    const product = await Product.findById(req.params.id)

    // Checkea si existe el producto
    if (product) {
      res.json(product)
    } else {
      // Envia un mensaje de error
      res.status(404)
      throw new Error('Product Not Found')
    }
  })
)

export default router
