import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../redux/actions/productActions";

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products = [], page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // test
  console.log("productList state:", productList);

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
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;

// import React from "react";
// import { Row, Col } from "react-bootstrap";
// import products from "../products";
// import Product from "../components/Product";

// function HomeScreen() {
//   return (
//     <div>
//       <h1>
//         <Row>
//           {products.map((product) => (
//             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//               <Product product={product} />
//             </Col>
//           ))}
//         </Row>
//       </h1>
//     </div>
//   );
// }

// export default HomeScreen;
