import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminScreen() {
  const navigate = useNavigate();

  const handleInventoryClick = () => {
    navigate("/admin/inventory");
  };

  const handleSalesHistoryClick = () => {
    navigate("/admin/salesHistory");
  };

  const handleUserAccountClick = () => {
    navigate("/admin/users");
  };

  return (
    <Container>
      <h1 className="my-4">Admin Dashboard</h1>
      <Row className="justify-content-center">
        <Col md={4} className="mb-3">
          <Button
            variant="primary"
            className="btn-block py-3"
            size="lg"
            onClick={handleInventoryClick}
          >
            Inventory
          </Button>
        </Col>
        <Col md={4} className="mb-3">
          <Button
            variant="primary"
            className="btn-block py-3"
            size="lg"
            onClick={handleSalesHistoryClick}
          >
            Sales History
          </Button>
        </Col>
        <Col md={4} className="mb-3">
          <Button
            variant="primary"
            className="btn-block py-3"
            size="lg"
            onClick={handleUserAccountClick}
          >
            User Accounts
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminScreen;
