import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";

import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";

export const login = (userEmail, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:8080/api/users/login",
      { password: password, userEmail: userEmail },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserInfo = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/api/users/load/userInfo?userId=${userId}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
};

export const register =
  (
    role,
    password,
    userEmail,
    firstName,
    lastName,
    phone = null,
    address = null,
    creditCardNum = null
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Prepare the payload for the API request
      const userRequest = {
        role: role, // Mandatory
        password: password, // Mandatory
        userEmail: userEmail, // Mandatory
        firstName: firstName, // Mandatory
        lastName: lastName, // Mandatory
        phone: phone || null, // Optional
        address: address
          ? {
              street: address.street,
              province: address.province,
              country: address.country,
              zip: address.zip,
            }
          : null, // Optional (nested object)
        creditCardNum: creditCardNum || null, // Optional
      };

      const { data } = await axios.post(
        "http://localhost:8080/api/users/add/user",
        userRequest,
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS });
      // dispatch({
      //   type: USER_REGISTER_SUCCESS,
      //   payload: data,
      // });
      console.log("Dispatch successful:", data);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// without authorization
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:8080/api/users/${id}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// export const getUserDetails = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: USER_DETAILS_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.get(
//       `http://localhost:8080/api/users/${id}`,
//       config
//     );

//     dispatch({
//       type: USER_DETAILS_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: USER_DETAILS_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.put(
      `http://localhost:8080/api/update/user`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// without requiring authentication
export const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const { data } = await axios.get("http://localhost:8080/api/users");
    console.log("data", data);
    dispatch({
      type: USER_LIST_SUCCESS,
      // payload: data._embedded.users,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
// export const listUsers = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: USER_LIST_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.get(`http://localhost:8080/api/users`, config);

//     dispatch({
//       type: USER_LIST_SUCCESS,
//       payload: data._embedded.users,
//     });
//   } catch (error) {
//     dispatch({
//       type: USER_LIST_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
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

    const { data } = await axios.delete(`/api/users/delete/${id}/`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    // Extract userId from the user object
    const { id, ...userRequest } = user;

    // Make the PUT request with userId as a query parameter
    const { data } = await axios.put(
      `http://localhost:8080/api/users/update/user?userId=${id}`, // Pass userId as a query parameter
      userRequest // Send the rest of the user object in the body
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
// export const updateUser = (user) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: USER_UPDATE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.put(
//       `/api/users/update/${user._id}/`,
//       user,
//       config
//     );

//     dispatch({
//       type: USER_UPDATE_SUCCESS,
//     });

//     dispatch({
//       type: USER_DETAILS_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: USER_UPDATE_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };
