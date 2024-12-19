import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listProducts, updateProduct } from "../redux/actions/productActions";
import { useLocation } from "react-router-dom";
import Paginate from "../components/Paginate";
function AdminInventory({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products = [], page, pages } = productList;

  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword") || "";
  const searchParams = new URLSearchParams(location.search);
  const searchType = searchParams.get("type") || ""; // Default to "name" search type
  const query = searchParams.get("query") || ""; // Extract query (keyword)
  const pageNumber = Number(searchParams.get("page")) || 1; // Extract page number

  useEffect(() => {
    dispatch(listProducts(query, keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // State for managing displayed quantities
  const [quantities, setQuantities] = useState({});

  const [inputQuantities, setInputQuantities] = useState({});

  const handleInputChange = (id, value) => {
    setInputQuantities((prevInputQuantities) => ({
      ...prevInputQuantities,
      [id]: value,
    }));
  };

  // Handle confirm button click
  const handleConfirm = (id) => {
    const newQuantity = inputQuantities[id];
    if (newQuantity !== undefined) {
      // Update quantities state for immediate display update
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: newQuantity,
      }));

      // Clear input state for this product after confirmation
      setInputQuantities((prevInputQuantities) => ({
        ...prevInputQuantities,
        [id]: undefined,
      }));

      // Dispatch action to update Redux and backend
      dispatch(updateProduct({ id, quantity: newQuantity }));
    }
  };

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Card className="my-3 p-3 rounded">
                <Link to={`/product/${product.id}`}>
                  <Card.Img src={product.img} />
                </Link>

                <Card.Body>
                  <Link to={`/product/${product.id}`}>
                    <Card.Title as="div">
                      <strong style={{ fontSize: "20px" }}>
                        {product.brand} {product.name}
                      </strong>
                    </Card.Title>
                  </Link>

                  {/* Display current or updated quantity */}
                  <Card.Text as="h3">
                    Quantity:{" "}
                    {quantities[product.id] !== undefined
                      ? quantities[product.id] // Show updated quantity if available
                      : product.quantity}{" "}
                  </Card.Text>

                  {/* Input field for updating quantity */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="number"
                      min="0"
                      value={
                        inputQuantities[product.id] !== undefined
                          ? inputQuantities[product.id]
                          : "" // Show empty if no local value
                      }
                      placeholder={quantities[product.id] || product.quantity} // Show current quantity as placeholder
                      onChange={(e) =>
                        handleInputChange(product.id, Number(e.target.value))
                      }
                      style={{ marginRight: "10px", width: "60px" }}
                    />

                    {/* Confirm button */}
                    <button
                      onClick={() => handleConfirm(product.id)}
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Paginate page={page} pages={pages} keyword={keyword} isAdmin={true} />
    </div>
  );
}

export default AdminInventory;
