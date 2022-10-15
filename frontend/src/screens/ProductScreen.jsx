import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = () => {
  const navigate = useNavigate()
  const [product, setProduct] = useState({})
  // Params toma los parametros de la url. En este caso queremos acceder al parametro    /:id que se asignó en la ruta del producto
  const params = useParams()
  // const product = products.find((p) => p._id === params.id)

  // Ejecuta las instrucciones dentro del arrow function cuando el componente carga
  // useEffect se usa para hacer peticiones al backend
  useEffect(
    () => {
      const fecthProduct = async () => {
        // Se crea una funcion asincrona para traer los productos del backend con la ruta /api/products
        // se desestructura la respuesta res con {data}
        const { data } = await axios.get(`/api/products/${params.id}`)

        // Se asigna products con la funcion setProducts igual a la data traida del backend
        setProduct(data)
      }

      // Se llama la función para que se ejecute cuando el componente se cargue
      fecthProduct()
    },
    // Este array representa las dependecias del useEffect, cada vez que una variable dentro de este array cambia, se ejecuta el useEffect
    [params.id]
  )

  return (
    <>
      <Button
        className='btn-light my-3'
        type='button'
        // navigate(-1) me lleva una página hacia atrás en el historial
        onClick={() => navigate(-1)}
      >
        Go back
      </Button>
      <Row>
        <Col md={6}>
          <Image
            src={product.image}
            alt={product.name}
            fluid
          />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
