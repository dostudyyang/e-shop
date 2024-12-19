// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Row, Col } from "react-bootstrap";
// import Product from "../components/Product";
// import Paginate from "../components/Paginate";
// import { listProducts } from "../redux/actions/productActions";
// import { useLocation } from "react-router-dom";

// function HomeScreen() {
//   const dispatch = useDispatch();
//   const productList = useSelector((state) => state.productList);
//   const { error, loading, products = [], page, pages } = productList;

//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const searchType = searchParams.get("type") || ""; // Default to empty (no filter)
//   const query = searchParams.get("query") || "";
//   const pageNumber = Number(searchParams.get("page")) || 1;

//   // Fetch products based on filters or show all products
//   useEffect(() => {
//     dispatch(listProducts(searchType, query, pageNumber));
//   }, [dispatch, searchType, query, pageNumber]);

//   return (
//     <div>
//       {/* Display different headings based on whether a search is active */}
//       {!query ? (
//         <h1>Latest Products</h1>
//       ) : (
//         <h1>Search Results for "{query}"</h1>
//       )}
//       {loading ? (
//         <h2>Loading...</h2>
//       ) : error ? (
//         <h3>{error}</h3>
//       ) : (
//         <div>
//           <Row>
//             {products.map((product) => (
//               <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
//                 <Product product={product} />
//               </Col>
//             ))}
//           </Row>
//           <Paginate page={page} pages={pages} keyword={query} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default HomeScreen;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import { listProducts } from "../redux/actions/productActions";
import { useLocation } from "react-router-dom";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products = [], page, pages } = productList;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchType = searchParams.get("type") || ""; // Default to "name" search type
  const query = searchParams.get("query") || ""; // Extract query (keyword)
  const pageNumber = Number(searchParams.get("page")) || 1; // Extract page number

  useEffect(() => {
    dispatch(listProducts(searchType, query, pageNumber)); // Pass correct parameters
  }, [dispatch, searchType, query, pageNumber]);

  return (
    <div>
      {!query ? (
        <h1>Latest Products</h1>
      ) : (
        <h1>Search Results for "{query}"</h1>
      )}
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={query} />
        </div>
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
