import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

// HomeScreen component to display the latest products using the useGetProductsQuery hook.
const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? <ProductCarousel/> : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          Error: {error?.data.message || error.error}
        </Message>
      ) : (
        <>
         <Meta/>
          {data.products.length !== 0 ? (
            <h2>Latest Products </h2>
          ) : (
            <h2>{keyword} not available</h2>
          )}

          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : " "}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
