import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
  ORDER_SEARCH_SUCCESS,
} from "../constants/orderConstants";

import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

export const createOrder =
  (userId, itemQuantities) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
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
        `http://localhost:8080/api/orders/checkout?userId=${userId}`,
        {
          itemQuantities,
        }
      );

      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: CART_CLEAR_ITEMS,
        payload: data,
      });

      localStorage.removeItem("cartItems");
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
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

    const { data } = await axios.get(
      `http://localhost:8080/api/orders/orderDetails?orderId=${orderId}`
    );

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const payOrder = (userId, userPayment) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
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

    const { data } = await axios.get(
      `http://localhost:8080/api/orders/payment?userId=${userId}&userPayment=${userPayment}`
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deliverOrder = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
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

    const { data } = await axios.get(
      `http://localhost:8080/api/orders/latestOrderSummary?userId=${userId}`
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listMyOrders =
  (userEmail, page = 0, size = 15) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_MY_REQUEST,
      });

      //   const {
      //     userLogin: { userInfo },
      //   } = getState();

      //   const config = {
      //     headers: {
      //       "Content-type": "application/json",
      //       Authorization: `Bearer ${userInfo.token}`,
      //     },
      //   };
      console.log("userEmail", userEmail);
      const { data } = await axios.get(
        `http://localhost:8080/api/orders/find/findByUserEmail?userEmail=${userEmail}&page=${page}&size=${size}`
      );

      dispatch({
        type: ORDER_LIST_MY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listOrders =
  (
    searchType = "", // Type of search: "email", "date", or "itemId"
    query = "", // Search query (e.g., email address, date, or item ID)
    page = 0, // Current page number
    size = 20 // Number of items per page
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // Base URL for your backend
      const baseUrl = "http://localhost:8080/api/orders";

      // Determine the endpoint based on searchType
      let url = "";
      if (searchType === "email") {
        url = `${baseUrl}/find/findByUserEmail?userEmail=${query}&page=${page}&size=${size}`;
      } else if (searchType === "date") {
        url = `${baseUrl}/find/findByDate?date=${query}&page=${page}&size=${size}`;
      } else if (searchType === "itemId") {
        url = `${baseUrl}/find/findByItemId?itemId=${query}&page=${page}&size=${size}`;
      } else {
        // Default to fetching all orders
        url = `${baseUrl}?page=${page}&size=${size}`;
      }

      // Fetch data from the backend
      const { data } = await axios.get(url, config);

      console.log("Fetched Orders:", data);

      if (searchType === "keyword" || query === "") {
        dispatch({
          type: ORDER_LIST_SUCCESS, // For fetching all products
          payload: data,
        });
      } else {
        dispatch({
          type: ORDER_SEARCH_SUCCESS, // For searching products
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// export const listOrders =
//   (page = 0, size = 20) =>
//   async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: ORDER_LIST_REQUEST,
//       });

//       const {
//         userLogin: { userInfo },
//       } = getState();

//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };

//       const { data } = await axios.get(
//         `http://localhost:8080/api/orders?page=${page}&size=${size}`
//       );

//       dispatch({
//         type: ORDER_LIST_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: ORDER_LIST_FAIL,
//         payload:
//           error.response && error.response.data.detail
//             ? error.response.data.detail
//             : error.message,
//       });
//     }
//   };

// export const listOrders =
//   (page = 0, size = 15, customerEmail = "", productName = "", Date = "") =>
//   async (dispatch, getState) => {
//     try {
//       dispatch({ type: ORDER_LIST_REQUEST });

//       const {
//         userLogin: { userInfo },
//       } = getState();

//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };

//       let url = `http://localhost:8080/api/orders?page=${page}&size=${size}`;
//       if (customerEmail) url += `&customerEmail=${customerEmail}`;
//       if (productName) url += `&productName=${productName}`;
//       if (Date) url += `&Date=${Date}`;

//       const { data } = await axios.get(url, config);

//       dispatch({
//         type: ORDER_LIST_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: ORDER_LIST_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//   };
