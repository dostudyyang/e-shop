import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate"; // Optional pagination component
import { listMyOrders } from "../redux/actions/orderActions";
import { getUserInfo } from "../redux/actions/userActions";
function MyOrderScreen() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [userEmail, setUserEmail] = useState("");
  const orderListMy = useSelector((state) => state.orderListMy);

  const { loading, error, orders, pages, page } = orderListMy;

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
    if (userEmail) {
      dispatch(listMyOrders(userEmail)); // Fetch orders for logged-in user
    }
  }, [dispatch, userEmail]);
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
                    <strong>Order ID:</strong> {order.id}
                  </Col>
                  <Col md={3}>
                    <strong>Date:</strong>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </Col>
                  <Col md={2}>
                    <strong>Total:</strong> ${order.orderPrice}
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
          <Paginate pages={pages} page={page} isMyOrder={true} />
        </>
      )}
    </div>
  );
}

export default MyOrderScreen;
