import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { savePaymentMethod } from "../redux/actions/cartActions";

// Mock payment service
let paymentAttempts = 0;
const mockPaymentService = () => {
  paymentAttempts++;
  return paymentAttempts % 3 !== 0; // Deny every 3rd attempt
};

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [cardNumber, setCardNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);

  // useEffect(() => {
  //   if (!shippingAddress.address) {
  //     navigate("/shipping");
  //   }
  // }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const paymentApproved = mockPaymentService();

    if (paymentApproved) {
      dispatch(savePaymentMethod(paymentMethod));
      setPaymentStatus("approved");
      setTimeout(() => navigate("/placeorder"), 2000); // Navigate after 2 seconds
    } else {
      setPaymentStatus("denied");
    }
  };

  const retryPayment = () => {
    setPaymentStatus(null);
    setCardNumber("");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Credit Card"
              id="creditCard"
              name="paymentMethod"
              value="Credit Card"
              checked={paymentMethod === "Credit Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </Form.Group>

        {paymentStatus === "approved" && (
          <Message variant="success">
            Payment Approved! Redirecting to order summary...
          </Message>
        )}

        {paymentStatus === "denied" && (
          <Message variant="danger">
            Credit Card Authorization Failed.
            <Row className="mt-3">
              <Col>
                <Button onClick={retryPayment} variant="primary">
                  Try Again
                </Button>
              </Col>
              <Col>
                <Button onClick={() => navigate("/")} variant="secondary">
                  Quit
                </Button>
              </Col>
            </Row>
          </Message>
        )}

        {paymentStatus === null && (
          <Button type="submit" variant="primary" className="my-3">
            Continue
          </Button>
        )}
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;

// import React, { useState, useEffect } from "react";
// import { Form, Button, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import FormContainer from "../components/FormContainer";
// import CheckoutSteps from "../components/CheckoutSteps";
// import { savePaymentMethod } from "../redux/actions/cartActions";

// function PaymentScreen() {
//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress } = cart;

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [paymentMethod, setPaymentMethod] = useState("PayPal");

//   useEffect(() => {
//     if (!shippingAddress.address) {
//       navigate("/shipping");
//     }
//   }, [shippingAddress, navigate]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(savePaymentMethod(paymentMethod));
//     navigate("/placeorder");
//   };

//   return (
//     <FormContainer>
//       <CheckoutSteps step1 step2 step3 />

//       <Form onSubmit={submitHandler}>
//         <Form.Group>
//           <Form.Label as="legend">Select Method</Form.Label>
//           <Col>
//             <Form.Check
//               type="radio"
//               label="PayPal or Credit Card"
//               id="paypal"
//               name="paymentMethod"
//               value="PayPal"
//               checked={paymentMethod === "PayPal"}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             ></Form.Check>
//           </Col>
//         </Form.Group>

//         <Button type="submit" variant="primary">
//           Continue
//         </Button>
//       </Form>
//     </FormContainer>
//   );
// }

// export default PaymentScreen;
