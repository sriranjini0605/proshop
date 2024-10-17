import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const {shippingAddress} = cart;

  useEffect(()=> {
    if(!shippingAddress) {
      navigate("/shipping");
    }
  },[shippingAddress,navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                id="paypal"
                label="PayPal or Credit Card"
                value="PayPal"
                name="paymentMethod"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Col>
            {/* <Col>
              <Form.Check
                type="radio"
                id="stripe"
                label="Stripe"
                value="Stripe"
                name="paymentMethod"
                checked={paymentMethod === "Stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Col> */}
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
