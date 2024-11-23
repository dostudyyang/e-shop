import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { getUserInfo } from "../redux/actions/userActions"; // Import getUserInfo
import { updateUser } from "../redux/actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { USER_UPDATE_RESET } from "../redux/constants/userConstants";

function UserEditScreen() {
  const { id } = useParams(); // Get userId from URL
  console.log("User ID:", id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State variables for form fields
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [creditCardNum, setCreditCard] = useState("");

  // Redux state selectors
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  // Fetch user info and populate form fields
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await dispatch(getUserInfo(id)); // Fetch user info using getUserInfo
        if (data) {
          setRole(data.role || "");
          setPassword(""); // Password should not be pre-filled for security reasons
          setEmail(data.userEmail || "");
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setPhone(data.phone || "");

          if (data.address) {
            setStreet(data.address.street || "");
            setProvince(data.address.province || "");
            setCountry(data.address.country || "");
            setZip(data.address.zip || "");
          }

          setCreditCard(data.creditCardNum || "");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [dispatch, id]);

  // Handle successful update and redirect to user list
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/users");
    }
  }, [successUpdate, navigate, dispatch]);

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();

    // Build the address object
    const address = {
      street,
      province,
      country,
      zip,
    };

    // Dispatch the update action
    dispatch(
      updateUser({
        id,
        role,
        password,
        userEmail,
        firstName,
        lastName,
        phone,
        address,
        creditCardNum,
      })
    );
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Edit User</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          <Form onSubmit={submitHandler}>
            {/* Email */}
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={userEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            {/* First Name */}
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            {/* Last Name */}
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            {/* Phone */}
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            {/* Address Fields */}
            <h5>Address</h5>
            {/* Street */}
            <Form.Group controlId="street">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </Form.Group>

            {/* Province */}
            <Form.Group controlId="province">
              <Form.Label>Province</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </Form.Group>

            {/* Country */}
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>

            {/* ZIP Code */}
            <Form.Group controlId="zip">
              <Form.Label>ZIP Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ZIP code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </Form.Group>

            {/* Credit Card */}
            <Form.Group controlId="creditCard">
              <Form.Label>Credit Card</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter credit card number"
                value={creditCardNum}
                onChange={(e) => setCreditCard(e.target.value)}
              />
            </Form.Group>

            {/* Submit Button */}
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserEditScreen;
