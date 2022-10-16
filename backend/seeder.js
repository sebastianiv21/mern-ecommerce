// Este script sirve para importar datos, no hace parte del proyecto
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

// Creamos funciones para crear y eliminar datos
const importData = async () => {
  try {
    // Eliminamos todos los registros
    // Cada query devuelve una promesa, por lo que usamos await delante de ellas
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // Importamos los usuarios
    const createdUsers = await User.insertMany(users)

    // Llamamos al user admin en una constante y almacenamos su id
    // Se llama al objeto 0 porque es el que contiene el admin
    const adminUser = createdUsers[0]._id

    // Importamos los productos y les asignamos como usuario el admin user
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // Eliminamos todos los registros
    // Cada query devuelve una promesa, por lo que usamos await delante de ellas
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// Al ejecutar node backend/seeder -d, se ejecuta la funcion destroyData, de lo contrario, se ejecuta importData
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
