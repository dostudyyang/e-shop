import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { listProducts } from "../redux/actions/productActions";
function NavScrollExample() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [role, setRole] = useState(null);
  const logoutHandler = () => {
    dispatch(logout());
    alert("You have been logged out successfully.");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (userInfo && !role) {
          const data = await dispatch(getUserInfo(userInfo));
          if (data && data.role) {
            setRole(data.role);
          }
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [dispatch, userInfo, role]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name"); // Default search type
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?type=${searchType}&query=${searchQuery}`); // Redirect to SearchScreen route
    } else {
      alert("Please enter a search term.");
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">E-SHOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/cart">
              <i class="fa-solid fa-cart-shopping">cart</i>
            </Nav.Link>
            {userInfo ? (
              <Nav.Link onClick={logoutHandler}>
                <i class="fa-solid fa-circle-xmark"> Logout</i>
              </Nav.Link>
            ) : (
              <Nav.Link href="/login">
                <i className="fa-solid fa-right-to-bracket"> Login</i>
              </Nav.Link>
            )}

            {role === "admin" ? (
              <Nav.Link href="/admin">
                <i className="fa-solid fa-user"> ADMIN</i>
              </Nav.Link>
            ) : role === "customer" ? (
              <Nav.Link href="/userProfile">
                <i className="fa-solid fa-user"> USER</i>
              </Nav.Link>
            ) : (
              <Nav.Link href="/login">
                <i className="fa-solid fa-user"> USER</i>
              </Nav.Link>
            )}
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="me-2"
            >
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="brand">Brand</option>
            </Form.Select>
            <Form.Control
              type="search"
              placeholder={`Search by ${searchType}`}
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
