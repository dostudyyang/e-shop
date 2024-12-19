import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import { listProducts } from "../redux/actions/productActions";
import { useLocation } from "react-router-dom";

function SearchScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, searchResults = [], page, pages } = productList;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchType = searchParams.get("type") || "name"; // Default to name search type
  const query = searchParams.get("query") || ""; // Extract query (keyword)
  const pageNumber = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch(listProducts(searchType, query, pageNumber)); // Fetch filtered results based on query and type
  }, [dispatch, searchType, query, pageNumber]);

  return (
    <div>
      <h1>Search Results</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div>
          <Row>
            {searchResults.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} />
        </div>
      )}
    </div>
  );
}

export default SearchScreen;
