import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  // Ejecuta las instrucciones dentro del arrow function cuando el componente carga
  // useEffect se usa para hacer peticiones al backend
  useEffect(
    () => {
      const fecthProducts = async () => {
        // Se crea una funcion asincrona para traer los productos del backend con la ruta /api/products
        // se desestructura la respuesta res con {data}
        const { data } = await axios.get('/api/products')

        // Se asigna products con la funcion setProducts igual a la data traida del backend
        setProducts(data)
      }

      // Se llama la función para que se ejecute cuando el componente se cargue
      fecthProducts()
    },
    // Este array representa las dependecias del useEffect, cada vez que una variable dentro de este array cambia, se ejecuta el useEffect
    []
  )

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col
            key={product._id}
            sm={12}
            md={6}
            lg={4}
            xl={3}
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
