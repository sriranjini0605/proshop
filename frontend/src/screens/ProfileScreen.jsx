import { useState, useEffect } from "react";
import {Table, Form, Button, Row, Col} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/usersApiSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.auth);

    const [updateProfile,{isLoading : loadingUpdateProfile}] = useProfileMutation();
    const {data: ordersApiSlice, isLoading, error} = useGetMyOrdersQuery();

    useEffect(() => {
        if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    },[userInfo, userInfo.name, userInfo.email]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
                dispatch(setCredentials(res));
                toast.success("Profile updated successfully");
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    };

  return (
  <Row>
    <Col md={3}>
     <h2>
        User Profile
     </h2>
     <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-2">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="email" className="my-2">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="password" className="my-2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="my-2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">Update</Button>
        {loadingUpdateProfile && <Loader />}
     </Form>
    </Col>
    <Col md={9}>
       <h2>My Orders</h2>
       {isLoading ? <Loader/> : error ? (<Message variant = 'danger'>
        {error?.data?.message || error.error}
       </Message>) : (
         <Table striped hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {ordersApiSlice.map ((order) => (
                    <tr key ={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                            {order.Paid? (
                                order.paidAt.substring(0,10)
                            ) : (
                                <FaTimes style = {{color: 'red'}}/>
                            )}
                        </td>
                        <td>
                            {order.Delivered? (
                                order.deliveredAt.substring(0,10)
                            ) : (
                                <FaTimes style = {{color: 'red'}}/>
                            )}
                        </td>
                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button variant="info">Details</Button>
                            </LinkContainer>
                        </td>
                    </tr>
                ))}
            </tbody>
         </Table>
       )}
    </Col>
  </Row>
  );
  };

export default ProfileScreen;
