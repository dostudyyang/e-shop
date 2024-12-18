import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../redux/actions/cartActions";
import { getUserInfo } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const id = useSelector((state) => state.userLogin.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const [useNewAddress, setUseNewAddress] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await dispatch(getUserInfo(id));
        if (data) {
          setRole(data.role || "");
          setPassword("");
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

  const validateShippingAddress = () => {
    return street && province && zip && country;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateShippingAddress()) {
      alert("Please provide a complete shipping address before proceeding.");
      return;
    }
    dispatch(saveShippingAddress({ street, province, zip, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        {/* Button to toggle between existing and new address */}
        <Button
          variant="secondary"
          onClick={() => setUseNewAddress(!useNewAddress)}
        >
          {useNewAddress ? "Use Existing Address" : "Add New Address"}
        </Button>

        {/* Render form fields based on the toggle */}
        {useNewAddress ? (
          <>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter address"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>Province</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter postal code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </>
        ) : (
          <>
            {/* Display existing address */}
            <p>
              <strong>Street:</strong> {street || "N/A"}
            </p>
            <p>
              <strong>Province:</strong> {province || "N/A"}
            </p>
            <p>
              <strong>Postal Code:</strong> {zip || "N/A"}
            </p>
            <p>
              <strong>Country:</strong> {country || "N/A"}
            </p>
          </>
        )}

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
