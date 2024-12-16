import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../redux/actions/userActions";

function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [creditCardNum, setCreditCardNum] = useState("");
  // const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo, success } = userRegister;

  const address =
    street && province && country && zip
      ? { street, province, country, zip }
      : null;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  useEffect(() => {
    if (success) {
      alert("Registration successful!");
      navigate(redirect ? `/login?redirect=${redirect}` : "/login");
    }
  }, [navigate, success, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        register(
          role,
          password,
          userEmail,
          firstName,
          lastName,
          phone,
          address,
          creditCardNum
        )
      );
    }
  };

  return (
    <FormContainer>
      <h1>Create account</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {/* Default option */}
            <option value="">Select Role</option>

            {/* Role options */}
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="passwordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="creditCard">
          <Form.Label>Credit Card Number</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Credit Card Number"
            value={creditCardNum}
            onChange={(e) => setCreditCardNum(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            required
            type="tel"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <h5>Address</h5>
        <Form.Group controlId="street">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="province">
          <Form.Label>Province</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="zip">
          <Form.Label>ZIP Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ZIP code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import FormContainer from "../components/FormContainer";
// import { register } from "../redux/actions/userActions";

// function RegisterScreen({ location, history }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const dispatch = useDispatch();

//   const redirect = location.search ? location.search.split("=")[1] : "/";

//   const userRegister = useSelector((state) => state.userRegister);
//   const { error, loading, userInfo } = userRegister;

//   useEffect(() => {
//     if (userInfo) {
//       history.push(redirect);
//     }
//   }, [history, userInfo, redirect]);

//   const submitHandler = (e) => {
//     e.preventDefault();

//     if (password != confirmPassword) {
//       setMessage("Passwords do not match");
//     } else {
//       dispatch(register(name, email, password));
//     }
//   };

//   return (
//     <FormContainer>
//       <h1>Sign In</h1>
//       {message && <Message variant="danger">{message}</Message>}
//       {error && <Message variant="danger">{error}</Message>}
//       {loading && <Loader />}
//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             required
//             type="name"
//             placeholder="Enter name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId="email">
//           <Form.Label>Email Address</Form.Label>
//           <Form.Control
//             required
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             required
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId="passwordConfirm">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             required
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Button type="submit" variant="primary">
//           Register
//         </Button>
//       </Form>

//       <Row className="py-3">
//         <Col>
//           Have an Account?{" "}
//           <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
//             Sign In
//           </Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   );
// }

// export default RegisterScreen;
