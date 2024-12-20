import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import ShoppingCart from "./screens/ShoppingCartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PaymentScreen from "./screens/PaymentScreen";
import AdminUserAccount from "./screens/AdminUserAccount";
import AdminScreen from "./screens/AdminScreen";
import UserEdit from "./screens/UserEdit";
import UserProfileScreen from "./screens/UserProfileScreen";
import AdminInventory from "./screens/AdminInventory";
import ShippingScreen from "./screens/ShippingScreen";
import SearchScreen from "./screens/SearchScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import MyOrderScreen from "./screens/MyOrderScreen";
import OrderDetail from "./screens/OrderDetail";
import AdminSalesHistory from "./screens/AdminSalesHistory";
import AdminSearchHistory from "./screens/AdminSearchHistory";
function App() {
  return (
    <div>
      <main>
        <Container>
          <Router>
            <Header />
            <Routes>
              <Route path="/" Component={HomeScreen} exact />
              <Route path="/product/:id" Component={ProductScreen} />
              <Route path="/search" Component={SearchScreen} />
              <Route path="/login" Component={LoginScreen} />
              <Route path="/register" Component={RegisterScreen} />
              <Route path="/payment" Component={PaymentScreen} />
              <Route path="/admin/users" Component={AdminUserAccount} />
              <Route path="/admin" Component={AdminScreen} />
              <Route path="/user/:id/edit" Component={UserEdit} />
              <Route path="/userProfile" Component={UserProfileScreen} />
              <Route path="/admin/inventory" Component={AdminInventory} />
              <Route path="/cart/:id" Component={ShoppingCart} />
              <Route path="/cart" Component={ShoppingCart} />
              <Route path="/shipping" Component={ShippingScreen} />
              <Route path="/placeorder" Component={PlaceOrderScreen} />
              <Route path="/myorder" Component={MyOrderScreen} />
              <Route path="/order/:id" Component={OrderDetail} />
              <Route path="/admin/salesHistory" Component={AdminSalesHistory} />
              <Route
                path="/admin/searchHistory"
                Component={AdminSearchHistory}
              />
            </Routes>
          </Router>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
