import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SORT_REQUEST,
  PRODUCT_SORT_SUCCESS,
  PRODUCT_SORT_FAIL,
  PRODUCT_FILTER_REQUEST,
  PRODUCT_FILTER_SUCCESS,
  PRODUCT_FILTER_FAIL,
} from "../constants/productConstants";

export const initialState = {
  loading: false,
  products: [],
  error: null,
  page: 1,
  pages: 1,
};
const extractIdFromLink = (link) => {
  const matches = link.href.match(/\/(\d+)$/);
  return matches ? matches[1] : null;
};

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_LIST_SUCCESS:
      const productsWithId = action.payload._embedded.items.map((item) => ({
        ...item,
        id: extractIdFromLink(item._links.self),
      }));
      return {
        loading: false,
        products: productsWithId,
        page: action.payload.page.number,
        pages: action.payload.page.totalPages,
      };

    case PRODUCT_SEARCH_SUCCESS:
      // Handle searching for specific products by name, category, or brand
      return {
        loading: false,
        searchResults: action.payload.content, // Use 'content' for search results
        page: action.payload.number + 1,
        pages: action.payload.totalPages,
      };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// export const productListReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case PRODUCT_LIST_REQUEST:
//       return { loading: true, products: [] };
//     case PRODUCT_LIST_SUCCESS:
//       const productsWithId = action.payload._embedded.items.map((item) => ({
//         ...item,
//         id: extractIdFromLink(item._links.self),
//       }));
//       return {
//         loading: false,
//         products: productsWithId,
//         page: action.payload.page.number,
//         pages: action.payload.page.totalPages,
//       };
//     case PRODUCT_LIST_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const productListReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case PRODUCT_LIST_REQUEST:
//       return { loading: true, products: [] };
//     case PRODUCT_LIST_SUCCESS:
//       return {
//         loading: false,
//         products: action.payload.content, // Map 'content' from the backend response
//         page: action.payload.number + 1, // Adjust page number (backend uses 0-based indexing)
//         pages: action.payload.totalPages, // Total number of pages
//       };
//     case PRODUCT_LIST_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };

    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };

    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: action.payload.quantity }
            : product
        ),
      };

    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_UPDATE_RESET:
      return { product: {} };

    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productSortReducer = (
  state = { sortedProducts: [], page: 0, pages: 0 },
  action
) => {
  switch (action.type) {
    case PRODUCT_SORT_REQUEST:
      return { loading: true, sortedProducts: [] };
    case PRODUCT_SORT_SUCCESS:
      return {
        loading: false,
        sortedProducts: action.payload.content, // Use 'content' for paginated data
        page: action.payload.pageable.pageNumber + 1, // Adjust for zero-based indexing
        pages: action.payload.totalPages,
        totalElements: action.payload.totalElements,
      };
    case PRODUCT_SORT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productFilterReducer = (
  state = { filteredProducts: [], page: 0, pages: 0 },
  action
) => {
  switch (action.type) {
    case PRODUCT_FILTER_REQUEST:
      return { loading: true, filteredProducts: [] };
    case PRODUCT_FILTER_SUCCESS:
      return {
        loading: false,
        filteredProducts: action.payload.content,
        page: action.payload.pageable.pageNumber + 1, // Adjust for zero-based indexing
        pages: action.payload.totalPages,
      };
    case PRODUCT_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
