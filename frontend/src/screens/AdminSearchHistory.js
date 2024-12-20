import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate"; // Optional pagination component
import { listOrders } from "../redux/actions/orderActions";
import { useLocation } from "react-router-dom";

function AdminSearchHistory() {
  const dispatch = useDispatch();
  const location = useLocation();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders = [], pages, page } = orderList;

  // Extract search parameters from URL
  const searchParams = new URLSearchParams(location.search);
  const searchType = searchParams.get("type") || "";
  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    if (searchType && searchQuery) {
      // Dispatch listOrders with search parameters
      dispatch(listOrders(searchType, searchQuery));
    }
  }, [dispatch, searchType, searchQuery]);

  return (
    <div>
      <h1>Search Results</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <ListGroup variant="flush">
            {orders.map((order) => (
              <ListGroup.Item key={order.id}>
                <Row>
                  <Col md={3}>
                    <strong>Order ID:</strong> {order.id}
                  </Col>
                  <Col md={3}>
                    <strong>Date:</strong>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </Col>
                  <Col md={2}>
                    <strong>Total:</strong> ${order.orderPrice.toFixed(2)}
                  </Col>

                  <Col md={2}>
                    <Button variant="primary" href={`/order/${order.id}`}>
                      Details
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Pagination */}
          <Paginate pages={pages} page={page} />
        </>
      )}
    </div>
  );
}

export default AdminSearchHistory;
