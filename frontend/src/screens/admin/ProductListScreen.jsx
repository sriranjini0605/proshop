import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from "../../slices/productApiSlice";

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, refetch, isLoading, error } = useGetProductsQuery({pageNumber});
  const [createProduct,{ isLoading: createLoading }] = useCreateProductMutation();
  const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation();
  
  const deleteHandler = async(id) => {
    if(window.confirm ("Are you sure you want to delete this product?")){
      try {
        await deleteProduct(id);
        toast.success("Product deleted");
        refetch();
      }
      catch(error){
        toast.error(error.message || error?.data?.message);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm(' Are you sure you want to create a new product?')) {
        try {
            await createProduct();
            refetch();
        } catch (error) {
            toast.error(error.error || error?.data?.message);
        }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick ={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {createLoading && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        <Table striped hover responsive className="table-sm">
          
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="outline-primary" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="outline-danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
        </Table>
        <Paginate pages={data.pages} page={data.page} isAdmin = {true}/>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
