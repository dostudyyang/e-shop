import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import ShoppingCartScreen from "./screens/ShoppingCartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PaymentScreen from "./screens/PaymentScreen";
import AdminUserAccount from "./screens/AdminUserAccount";
import AdminScreen from "./screens/AdminScreen";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <Router>
            <Routes>
              <Route path="/" Component={HomeScreen} exact />
              <Route path="/product/:id" Component={ProductScreen} />
              <Route path="/product/:id" Component={ShoppingCartScreen} />
              <Route path="/login" Component={LoginScreen} />
              <Route path="/register" Component={RegisterScreen} />
              <Route path="/payment" Component={PaymentScreen} />
              <Route path="/admin/users" Component={AdminUserAccount} />
              <Route path="/admin" Component={AdminScreen} />
            </Routes>
          </Router>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
