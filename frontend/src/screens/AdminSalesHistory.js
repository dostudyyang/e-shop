import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Button, Form } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate"; // Optional pagination component
import { listOrders } from "../redux/actions/orderActions";
import { getUserInfo } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
function AdminSalesHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("email");
  const navigate = useNavigate();
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

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchType === "date") {
      // Validate date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(searchQuery.trim())) {
        alert("Invalid date format. Please use YYYY-MM-DD (e.g., 2024-12-19).");
        return;
      }
    }

    if (searchQuery.trim()) {
      navigate(`/admin/searchHistory?type=${searchType}&query=${searchQuery}`);
    } else {
      alert("Please enter a valid search term.");
    }
  };

  return (
    <div>
      <h1>Sale History</h1>
      {/* Search Bar */}
      <Form className="d-flex mb-4" onSubmit={handleSearch}>
        <Form.Select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="me-2"
        >
          <option value="email">Email</option>
          <option value="date">Date</option>
          <option value="itemId">Item ID</option>
        </Form.Select>
        <Form.Control
          type="search"
          placeholder={
            searchType === "date"
              ? "Search by date, format YYYY-MM-DD"
              : `Search by ${searchType}`
          }
          className="me-2"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>
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
                    {new Date(order.date).toISOString().split("T")[0]}
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
