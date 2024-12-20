import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate"; // Optional pagination component
import { listOrders } from "../redux/actions/orderActions";
import { getUserInfo } from "../redux/actions/userActions";
function AdminSalesHistory() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [userEmail, setUserEmail] = useState("");
  const orderList = useSelector((state) => state.orderList);

  const { loading, error, orders, pages, page } = orderList;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await dispatch(getUserInfo(userInfo));
        if (data) {
          if (data.userEmail) {
            setUserEmail(data.userEmail);
          }
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [dispatch, userInfo]);

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);
  console.log("orders", orders);
  return (
    <div>
      <h1>My Orders</h1>
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
                    <strong>Order ID:</strong>{" "}
                    {order._links.self.href.split("/").pop()}
                  </Col>
                  <Col md={3}>
                    <strong>Date:</strong>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </Col>
                  <Col md={2}>
                    <strong>Total:</strong> ${order.orderPrice}
                  </Col>

                  <Col md={2}>
                    <Button
                      variant="primary"
                      href={`/order/${order._links.self.href.split("/").pop()}`}
                    >
                      Details
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Pagination */}
          <Paginate pages={pages} page={page} isMyOrder={true} />
        </>
      )}
    </div>
  );
}

export default AdminSalesHistory;
