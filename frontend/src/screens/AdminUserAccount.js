import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  listUsers,
  deleteUser,
  getUserInfo,
} from "../redux/actions/userActions";
import Paginate from "../components/Paginate";

function AdminUserAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to detect navigation
  const [userInfos, setUserInfos] = useState({}); // To store additional user details
  const [fetchError, setFetchError] = useState(null); // To handle errors during fetch
  const userList = useSelector((state) => state.userList);
  const { error, loading, users = [], page, pages } = userList;
  const keyword = new URLSearchParams(location.search).get("keyword") || "";
  const pageNumber =
    Number(new URLSearchParams(location.search).get("page")) || 1;

  // Redux state selectors

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  // Fetch the list of users on component mount or when returning to this screen
  useEffect(() => {
    dispatch(listUsers(keyword, pageNumber));
    setUserInfos({}); // Reset additional user info when navigating back
    setFetchError(null); // Clear any previous fetch errors
  }, [dispatch, successDelete, location, keyword, pageNumber]); // Add location as a dependency

  // Fetch additional user information (e.g., address) for all users
  useEffect(() => {
    const fetchUserInfos = async () => {
      if (users && users.length > 0) {
        try {
          const fetchedInfos = {};
          await Promise.all(
            users.map(async (user) => {
              const userId = user._links.self.href.split("/").pop();
              const userInfo = await dispatch(getUserInfo(userId));
              fetchedInfos[userId] = userInfo;
            })
          );
          setUserInfos(fetchedInfos); // Batch update state after all data is fetched
        } catch (error) {
          console.error("Error fetching user info:", error);
          setFetchError("Failed to fetch additional user details.");
        }
      }
    };

    fetchUserInfos();
  }, [users, dispatch]);

  // Handle delete action
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleEdit = (userId) => {
    navigate(`/user/${userId}/edit`);
  };

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {fetchError && <Message variant="danger">{fetchError}</Message>}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>PHONE</th>
                <th>ADDRESS</th>
                <th>CREDIT CARD</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const userId = user._links.self.href.split("/").pop();
                const userInfo = userInfos[userId] || {}; // Use stored info or fallback to empty object
                const address = userInfo.address || {}; // Extract address object

                return (
                  <tr key={userId}>
                    <td>{userId}</td>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{user.userEmail}</td>
                    <td>{user.role}</td>
                    <td>{user.phone}</td>

                    {/* Render Address */}
                    <td>
                      {address.street ? (
                        <>
                          {address.street}, {address.province},{" "}
                          {address.country} - {address.zip}
                        </>
                      ) : (
                        "No Address Available"
                      )}
                    </td>

                    {/* Render Credit Card */}
                    <td>{user.creditCardNum || "No Credit Card"}</td>

                    {/* Actions */}
                    <td>
                      {/* Edit Button */}
                      <Button
                        variant="light"
                        className="btn-sm"
                        onClick={() => handleEdit(userId)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>

                      {/* Delete Button */}
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(userId)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
      <Paginate
        page={page}
        pages={pages}
        keyword={keyword}
        isAdmin={true}
        isAdminUser={true}
      />
    </div>
  );
}

export default AdminUserAccount;

// import React, { useEffect } from "react";
// import { LinkContainer } from "react-router-bootstrap";
// import { Table, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import { listUsers, deleteUser } from "../redux/actions/userActions";

// function UserListScreen() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const userList = useSelector((state) => state.userList);
//   const { loading, error, users } = userList;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const userDelete = useSelector((state) => state.userDelete);
//   const { success: successDelete } = userDelete;

//   useEffect(() => {
//     if (userInfo && userInfo.isAdmin) {
//       dispatch(listUsers());
//     } else {
//       navigate("/login");
//     }
//   }, [dispatch, navigate, successDelete, userInfo]);

//   const deleteHandler = (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       dispatch(deleteUser(id));
//     }
//   };

//   return (
//     <div>
//       <h1>Users</h1>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <Table striped bordered hover responsive className="table-sm">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>NAME</th>
//               <th>EMAIL</th>
//               <th>ADMIN</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user._id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   {user.isAdmin ? (
//                     <i className="fas fa-check" style={{ color: "green" }}></i>
//                   ) : (
//                     <i className="fas fa-times" style={{ color: "red" }}></i>
//                   )}
//                 </td>
//                 <td>
//                   <LinkContainer to={`/admin/user/${user._id}/edit`}>
//                     <Button variant="light" className="btn-sm">
//                       <i className="fas fa-edit"></i>
//                     </Button>
//                   </LinkContainer>
//                   <Button
//                     variant="danger"
//                     className="btn-sm"
//                     onClick={() => deleteHandler(user._id)}
//                   >
//                     <i className="fas fa-trash"></i>
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// }

// export default UserListScreen;
