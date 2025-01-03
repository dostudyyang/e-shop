import axios from "axios";
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
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
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

// export const listProducts =
//   (keyword = "", pageNumber = 1, size = 20) =>
//   async (dispatch) => {
//     try {
//       dispatch({ type: PRODUCT_LIST_REQUEST });

//       const { data } = await axios.get(
//         `http://localhost:8080/api/items?keyword=${keyword}&page=${
//           pageNumber - 1
//         }&size=${size}`
//       );
//       console.log("data", data);
//       dispatch({
//         type: PRODUCT_LIST_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: PRODUCT_LIST_FAIL,
//         payload:
//           error.response && error.response.data.detail
//             ? error.response.data.detail
//             : error.message,
//       });
//     }
//   };

// export const listProducts =
//   (searchType = "keyword", query = "", pageNumber = 1, size = 20) =>
//   async (dispatch) => {
//     try {
//       dispatch({ type: PRODUCT_LIST_REQUEST });

//       // Base URL for your backend
//       const baseUrl = "http://localhost:8080/api/items";

//       // Determine the endpoint based on searchType
//       let url = "";
//       if (searchType === "name") {
//         url = `${baseUrl}/find/findByName?name=${query}&page=${
//           pageNumber - 1
//         }&size=${size}`;
//       } else if (searchType === "category") {
//         url = `${baseUrl}/find/findByCategory?category=${query}&page=${
//           pageNumber - 1
//         }&size=${size}`;
//       } else if (searchType === "brand") {
//         url = `${baseUrl}/find/findByBrand?brand=${query}&page=${
//           pageNumber - 1
//         }&size=${size}`;
//       } else {
//         // Default to keyword search (or fallback)
//         url = `${baseUrl}?keyword=${query}&page=${pageNumber - 1}&size=${size}`;
//       }

//       // Fetch data from the backend
//       const { data } = await axios.get(url);

//       console.log("data", data);

//       // Dispatch success action with fetched data
//       dispatch({
//         type: PRODUCT_LIST_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       // Dispatch failure action with error message
//       dispatch({
//         type: PRODUCT_LIST_FAIL,
//         payload:
//           error.response && error.response.data.detail
//             ? error.response.data.detail
//             : error.message,
//       });
//     }
//   };

export const listProducts =
  (
    searchType = "keyword",
    query = "",
    pageNumber = 1,
    size = 20,
    isSorting = false
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      // Base URL for your backend
      const baseUrl = "http://localhost:8080/api/items";

      if (isSorting) {
        size = 1000;
        pageNumber = 1;
      }

      // Determine the endpoint based on searchType
      let url = "";
      if (searchType === "name") {
        url = `${baseUrl}/find/findByName?name=${query}&page=${
          pageNumber - 1
        }&size=${size}`;
      } else if (searchType === "category") {
        url = `${baseUrl}/find/findByCategory?category=${query}&page=${
          pageNumber - 1
        }&size=${size}`;
      } else if (searchType === "brand") {
        url = `${baseUrl}/find/findByBrand?brand=${query}&page=${
          pageNumber - 1
        }&size=${size}`;
      } else {
        // Default to fetching all products
        url = `${baseUrl}?page=${pageNumber - 1}&size=${size}`;
      }

      // Fetch data from the backend
      const { data } = await axios.get(url);

      console.log("data", data);

      // Dispatch appropriate success action based on searchType
      if (searchType === "keyword" || query === "") {
        dispatch({
          type: PRODUCT_LIST_SUCCESS, // For fetching all products
          payload: data,
        });
      } else {
        dispatch({
          type: PRODUCT_SEARCH_SUCCESS, // For searching products
          payload: data,
        });
      }
    } catch (error) {
      // Dispatch failure action with error message
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// export const listProducts =
//   (searchType = "keyword", query = "", pageNumber = 1, size = 20) =>
//   async (dispatch) => {
//     try {
//       dispatch({ type: PRODUCT_LIST_REQUEST });

//       // Base URL for your backend
//       const baseUrl = "http://localhost:8080/api/items";

//       // Determine the endpoint based on searchType
//       let url = "";
//       if (searchType === "name") {
//         url = `${baseUrl}/findByName?name=${query}&page=${
//           pageNumber - 1
//         }&size=${size}`;
//       } else if (searchType === "category") {
//         url = `${baseUrl}/find/findByCategory?category=${query}&page=${
//           pageNumber - 1
//         }&size=${size}`;
//       } else if (searchType === "brand") {
//         url = `${baseUrl}/findByBrand?brand=${query}&page=${
//           pageNumber - 1
//         }&size=${size}`;
//       } else {
//         // Default to keyword search (or fallback)
//         url = `${baseUrl}?keyword=${query}&page=${pageNumber - 1}&size=${size}`;
//       }

//       // Fetch data from the backend
//       const { data } = await axios.get(url);

//       console.log("Backend Response:", data);

//       // Dispatch success action with transformed data
//       dispatch({
//         type: PRODUCT_LIST_SUCCESS,
//         payload: {
//           items: data.content, // Map 'content' to 'items'
//           page: data.number + 1, // Backend pages are 0-based; adjust to 1-based
//           pages: data.totalPages,
//         },
//       });
//     } catch (error) {
//       // Dispatch failure action with error message
//       dispatch({
//         type: PRODUCT_LIST_FAIL,
//         payload:
//           error.response && error.response.data.detail
//             ? error.response.data.detail
//             : error.message,
//       });
//     }
//   };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(`/api/products/top/`);

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`http://localhost:8080/api/items/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/products/delete/${id}/`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/create/`, {}, config);
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const { id, quantity } = product;

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:8080/api/items/update/itemQuantity?itemId=${id}&quantity=${quantity}`,
      product,
      config
    );
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: { id, quantity },
    });

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/products/${productId}/reviews/`,
        review,
        config
      );
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const sortProducts =
  (items, sortBy = "price", direction = "asc", pageNumber = 1, size = 20) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_SORT_REQUEST });

      const { data } = await axios.post(
        `http://localhost:8080/api/items/sort?sortBy=${sortBy}&direction=${direction}&page=${
          pageNumber - 1
        }&size=${size}`,
        { items } // Pass the list of items to be sorted
      );

      dispatch({
        type: PRODUCT_SORT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_SORT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const filterProducts =
  (category = "", brand = "", pageNumber = 1, size = 20) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_FILTER_REQUEST });

      let url = `http://localhost:8080/api/items/filter?page=${
        pageNumber - 1
      }&size=${size}`;
      if (category) url += `&category=${category}`;
      if (brand) url += `&brand=${brand}`;
      console.log("category", category);
      console.log("url", url);
      const { data } = await axios.get(url);
      console.log("filterProducts data", data);
      dispatch({
        type: PRODUCT_FILTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_FILTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
