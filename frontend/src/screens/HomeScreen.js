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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import {
  listProducts,
  sortProducts,
  filterProducts,
} from "../redux/actions/productActions";
import { useLocation } from "react-router-dom";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products = [], page, pages } = productList;

  const productSort = useSelector((state) => state.productSort);
  const {
    sortedProducts = [],
    page: sortedPage,
    pages: sortedPages,
    loading: sortLoading,
    error: sortError,
  } = productSort;

  const productFilter = useSelector((state) => state.productFilter);
  const {
    filteredProducts = [],
    page: filteredPage,
    pages: filteredPages,
    loading: filterLoading,
    error: filterError,
  } = productFilter;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchType = searchParams.get("type") || ""; // Default to "name" search type
  const query = searchParams.get("query") || ""; // Extract query (keyword)
  const pageNumber = Number(searchParams.get("page")) || 1; // Extract page number

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  // State for sorting
  const [sortBy, setSortBy] = useState("price");
  const [direction, setDirection] = useState("asc");

  // Fetch products based on filters and pagination
  useEffect(() => {
    if (selectedCategory || selectedBrand) {
      console.log("selectedCategory", selectedCategory);
      dispatch(filterProducts(selectedCategory, selectedBrand, pageNumber));
    } else {
      dispatch(listProducts(searchType, query, pageNumber));
    }
  }, [
    dispatch,
    searchType,
    query,
    pageNumber,
    selectedCategory,
    selectedBrand,
  ]);

  // Fetch products based on filters and pagination
  useEffect(() => {
    dispatch(
      listProducts(
        searchType,
        query,
        pageNumber,
        selectedCategory,

        selectedBrand
      )
    );
  }, [
    dispatch,
    searchType,
    query,
    pageNumber,
    selectedCategory,

    selectedBrand,
  ]);

  // Handle sorting
  const handleSortChange = () => {
    dispatch(sortProducts(products, sortBy, direction, pageNumber));
  };

  return (
    <div>
      {/* Header */}
      {!query ? (
        <h1>Latest Products</h1>
      ) : (
        <h1>Search Results for "{query}"</h1>
      )}

      {/* Filters */}
      <Row>
        <Col md={3}>
          <h4>Filters</h4>

          {/* Category Filter */}
          <div>
            <h5>Category</h5>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-select"
            >
              <option value="">All Categories</option>
              <option value="Outdoor Adventure">Outdoor Adventure</option>
              <option value="Apparel">Apparel</option>
              {/* Add more categories */}
            </select>
          </div>

          {/* Brand Filter */}
          <div className="mt-3">
            <h5>Brand</h5>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="form-select"
            >
              <option value="">All Brands</option>
              <option value="Columbia">Columbia</option>
              <option value="Patagonia">Patagonia</option>
              {/* Add more brands */}
            </select>
          </div>

          {/* Clear Filters Button */}
          <button
            className="btn btn-secondary mt-3"
            onClick={() => {
              setSelectedCategory("");

              setSelectedBrand("");
            }}
          >
            Clear Filters
          </button>

          {/* Sorting Options */}
          <div className="mt-3">
            <h5>Sort By</h5>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
            >
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>

            <h5 className="mt-3">Direction</h5>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="form-select"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>

            {/* Apply Sort Button */}
            <button className="btn btn-primary mt-3" onClick={handleSortChange}>
              Apply Sort
            </button>
          </div>
        </Col>

        {/* Product Display */}
        <Col md={9}>
          {sortLoading || loading ? (
            <h2>Loading...</h2>
          ) : sortError || error ? (
            <h3>{sortError || error}</h3>
          ) : (
            <>
              {/* <Row>
                {(sortedProducts.length > 0 ? sortedProducts : products).map(
                  (product) => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  )
                )}
              </Row> */}
              <Row>
                {(filteredProducts.length > 0
                  ? filteredProducts
                  : products
                ).map((product) => (
                  <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              {/* <Paginate
                page={sortedPage || page}
                pages={sortedPages || pages}
                keyword={query}
              /> */}
              <Paginate
                page={filteredPage || page}
                pages={filteredPages || pages}
                keyword={query}
              />
            </>
          )}
        </Col>
      </Row>
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
