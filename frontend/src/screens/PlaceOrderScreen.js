import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  createOrder,
  payOrder,
  deliverOrder,
} from "../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../redux/constants/orderConstants";
import { useNavigate } from "react-router-dom";

function PlaceOrderScreen({ history }) {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [preservedCartItems, setPreservedCartItems] = useState([]);
  const [preservedTotalPrice, setPreservedTotalPrice] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState(""); // State for input amount
  const [paymentError, setPaymentError] = useState(null); // State for payment error
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = Number(0.13 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = Number(cart.itemsPrice)
    // Number(cart.shippingPrice) +
    // Number(cart.taxPrice)
    .toFixed(2);
  const totalPricePayment = cart.totalPrice;
  // if (!cart.paymentMethod) {
  //   history.push("/payment");
  // }

  // Preserve cart items on initial load
  useEffect(() => {
    if (cart.cartItems.length > 0) {
      setPreservedCartItems(cart.cartItems); // Save current cart items to local state
    }
  }, [cart.cartItems]);

  useEffect(() => {
    if (cart.totalPrice > 0) {
      setPreservedTotalPrice(cart.totalPrice); // Save current cart items to local state
    }
  }, [cart.totalPrice]);

  useEffect(() => {
    if (success) {
      alert("order successful!");
      dispatch({ type: ORDER_CREATE_RESET });
      // navigate("/");
    }
  }, [success, history]);

  const placeOrder = () => {
    if (Number(paymentAmount) !== Number(cart.totalPrice)) {
      setPaymentError("Credit Card Authorization Failed");
      return;
    }
    const itemQuantities = {};
    cart.cartItems.forEach((item) => {
      itemQuantities[item.id] = item.qty;
    });

    dispatch(createOrder(userInfo, itemQuantities));
    dispatch(deliverOrder(userInfo));

    dispatch(payOrder(userInfo, totalPricePayment));
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.street}, {cart.shippingAddress.province}
                {"  "}
                {cart.shippingAddress.zip},{"  "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup variant="flush">
                {(preservedCartItems.length > 0
                  ? preservedCartItems
                  : cart.cartItems
                ).map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.img} alt={item.name} fluid rounded />
                      </Col>

                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>

                      <Col md={4}>
                        {item.qty} X ${item.price} = $
                        {(item.qty * item.price).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              {/* <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item> */}

              {/* <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item> */}

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>
                    $
                    {preservedTotalPrice > 0
                      ? preservedTotalPrice
                      : cart.totalPrice}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Enter Payment Amount:</strong>
                  </Col>
                  <Col>
                    <input
                      type="number"
                      min="0"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="payment amount"
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                {paymentError && (
                  <>
                    <Message variant="danger">{paymentError}</Message>
                    <Row className="mt-3">
                      <Col>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setPaymentError(null); // Clear error
                            setPaymentAmount(""); // Reset input field
                          }}
                        >
                          Retry Payment
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="secondary"
                          onClick={() => navigate("/")}
                        >
                          Quit
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
