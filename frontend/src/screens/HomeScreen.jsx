import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import products from "../products";

const HomeScreen = () => {
  return (
    <>
      {/* this is called a fragment */}
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          //   This 'sm={12} md={6} lg={4} xl={3}' garanties the React Responsiveness
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
