import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails } from "../redux/actions/orderActions";

function OrderDetail() {
  const dispatch = useDispatch();
  const { id: orderId } = useParams(); // Extract orderId from URL

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(orderId)); // Fetch order details
  }, [dispatch, orderId]);

  return (
    <div>
      <h1>Order Details</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* Order Summary */}
          <Card className="mb-3">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h5>User Information</h5>
                  <p>
                    <strong>Name:</strong> {order.userFullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.userEmail}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.phone}
                  </p>
                </Col>
                <Col md={6}>
                  <h5>Shipping Address</h5>
                  <p>
                    <strong>Street:</strong> {order.address.street}
                  </p>
                  <p>
                    <strong>Province:</strong> {order.address.province}
                  </p>
                  <p>
                    <strong>Country:</strong> {order.address.country}
                  </p>
                  <p>
                    <strong>ZIP:</strong> {order.address.zip}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Order Items */}
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5>Order Items</h5>
            </ListGroup.Item>
            {order.orderItemResponseList.map((item) => (
              <ListGroup.Item key={item.itemId}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.img} alt={item.itemName} fluid rounded />
                  </Col>
                  <Col md={4}>{item.itemName}</Col>
                  <Col md={3}>Brand: {item.brand}</Col>
                  <Col md={2}>${item.itemPrice.toFixed(2)}</Col>
                  <Col md={1}>x{item.orderQuantity}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Order Total */}
          <Card className="mt-3">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h5>Total Price:</h5>
                </Col>
                <Col md={6}>
                  <h5>${order.orderPrice.toFixed(2)}</h5>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
}

export default OrderDetail;
