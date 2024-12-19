import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserProfileScreen() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const handleAccountClick = () => {
    navigate(`/user/${userInfo}/edit`);
  };

  const handlePurchaseHistoryClick = () => {
    navigate("/myorder");
  };

  return (
    <Container>
      <h1 className="my-4">User Dashboard</h1>
      <Row className="justify-content-center">
        <Col md={4} className="mb-3">
          <Button
            variant="primary"
            className="btn-block py-3"
            size="lg"
            onClick={handleAccountClick}
          >
            Your Account
          </Button>
        </Col>
        <Col md={4} className="mb-3">
          <Button
            variant="primary"
            className="btn-block py-3"
            size="lg"
            onClick={handlePurchaseHistoryClick}
          >
            Purchase History
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfileScreen;
