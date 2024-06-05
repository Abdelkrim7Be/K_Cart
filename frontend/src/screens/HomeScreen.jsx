import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message"
import { useGetProductsQuery } from "../Slices/productsApiSlice";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error?.error}</Message>
      ) : (
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
      )}
    </>
  );
};

export default HomeScreen;
