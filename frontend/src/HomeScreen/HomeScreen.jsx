import React from "react";
import { Row, Col } from "react-bootstrap";
import products from "../products";
import Product from "../components/Product";
import { ItemList } from "./compoents/ItemList";

function HomeScreen() {
  return (
    <>
      <ItemList/>
    </>
  );
}

export default HomeScreen;
