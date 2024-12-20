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
  console.log("selectedCategory", selectedCategory);
  const [selectedBrand, setSelectedBrand] = useState("");

  // State for sorting
  const [sortBy, setSortBy] = useState("price");
  const [direction, setDirection] = useState("asc");

  // Fetch products based on filters and pagination
  useEffect(() => {
    if (selectedCategory || selectedBrand) {
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
              <option value="Electronics">Electronics</option>
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
              <option value="Adidas">Adidas</option>
              <option value="Apple">Apple</option>
              <option value="H&M">H&M</option>
              <option value="Huawei">Huawei</option>
              <option value="Nike">Nike</option>
              <option value="Samsung">Samsung</option>
              <option value="Sony">Sony</option>
              <option value="The North Face">The North Face</option>
              <option value="Uniqlo">Uniqlo</option>
            </select>
          </div>

          {/* <button
            className="btn btn-secondary mt-3"
            onClick={() => {
              setSelectedCategory("");
              setSelectedBrand("");
            }}
          >
            Clear Filters
          </button> */}
          <button
            className="btn btn-secondary mt-3"
            onClick={() => {
              window.location.reload(); // Reload the page
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
              <Row>
                {sortedProducts.length > 0 ? (
                  sortedProducts.map((product) => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))
                ) : filteredProducts.length === 0 &&
                  (selectedCategory || selectedBrand) ? (
                  <h3>No products found for the selected filters.</h3>
                ) : (
                  products.map((product) => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))
                )}
              </Row>
              <Paginate
                page={sortedPage || filteredPage || page} // Prioritize sortedPage, then filteredPage, then default page
                pages={sortedPages || filteredPages || pages} // Prioritize sortedPages, then filteredPages, then default pages
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
