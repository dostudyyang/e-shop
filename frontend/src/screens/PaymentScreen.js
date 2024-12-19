import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../redux/actions/cartActions";
import { getUserInfo } from "../redux/actions/userActions";

function PaymentScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [cardNumber, setCardNumber] = useState("");
  const [useSavedCard, setUseSavedCard] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const id = useSelector((state) => state.userLogin.userInfo);

  const [creditCardNum, setCreditCard] = useState("");

  // Fetch user info to check if a saved card exists
  useEffect(() => {
    if (userInfo && userInfo.creditCardNum) {
      setCardNumber(userInfo.creditCardNum); // Pre-fill with saved card number
      setUseSavedCard(true); // Default to using the saved card
    }
  }, [userInfo]);

  // Fetch additional user details (e.g., credit card number)
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await dispatch(getUserInfo(id));
        if (data) {
          if (data.creditCardNum) {
            setCreditCard(data.creditCardNum);
            setUseSavedCard(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [dispatch, id]);

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();

    // Validation: Check if entered card number matches saved card number
    if (useSavedCard && creditCardNum !== creditCardNum) {
      alert("The entered credit card number does not match your saved card.");
      return;
    }

    // If no saved card is being used but no new card is entered
    if (!useSavedCard && !cardNumber) {
      alert("Please enter a valid card number.");
      return;
    }

    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        {/* Payment Method Selection */}
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Credit Card"
              id="creditCard"
              name="paymentMethod"
              value="Credit Card"
              checked={paymentMethod === "Credit Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        {/* Toggle between using saved card or adding a new one */}
        {userInfo && creditCardNum ? (
          <>
            <Button
              variant="secondary"
              className="my-3"
              onClick={() => setUseSavedCard(!useSavedCard)}
            >
              {useSavedCard ? "Add New Card" : "Use Saved Card"}
            </Button>

            {/* Display saved card or input form */}
            {useSavedCard ? (
              <Form.Group className="my-2">
                <Form.Label>Using saved card:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Using saved card:"
                  value={creditCardNum}
                  onChange={(e) => setCreditCard(e.target.value)}
                  required
                />
              </Form.Group>
            ) : (
              <Form.Group className="my-2">
                <Form.Label>New Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </Form.Group>
            )}
          </>
        ) : (
          // If no saved card exists, show input form for new card
          <Form.Group className="my-2">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </Form.Group>
        )}

        {/* Submit Button */}
        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
