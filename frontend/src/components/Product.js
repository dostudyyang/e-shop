import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product.id}`}>
        <Card.Img src={product.img} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title as="div">
            <strong style={{ fontSize: "20px" }}>
              {/* {product.brand}  */}
              {product.name}
            </strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3" style={{ fontSize: "20px" }}>
            <Rating
              value={product.rating}
              text={` reviews`}
              color={"#f8e825"}
            />
          </div>
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
