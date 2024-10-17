import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productApiSlice";


const ProductCarousel = () => {

  const { data: products, isLoading, error } = useGetTopProductsQuery();
  console.log("top products", products);

  return isLoading ? <Loader/> : error ? <Message variant = 'danger'>{error}</Message> : (
    <Carousel pause = 'hover' className = 'bg-primary mb-4'>
        {products.map(product => (
            <Carousel.Item key = {product._id}>
              <Link to = {`/product/${product._id}`}>
                <Image src = {product.image} alt = {product.name} fluid />
                <Carousel.Caption>
                  <h3>{product.name}</h3>
                  <p>{product.description.substring(0, 100)}...</p>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  )
}

export default ProductCarousel
