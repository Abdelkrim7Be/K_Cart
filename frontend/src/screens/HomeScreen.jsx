import React from "react";
// We are using a fetch hook to fetch our data
// useState is a react hook that allows functionnal components to maage states
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
// import products from "../products";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  // It initializes a state variable products with an initial value of an empty array ([]).

  // useEffect is used to perform side effects in functionnal components.
  // These side effetc may include data fetching, subscriptions, or manually changing the DOM

  useEffect(() => {
    const fetchProducts = async () => {
      // this is an asychronous function that fetches products data from an API using AXIOS
      // and updates the state with the fetched data using 'setProducts'
      const {data} = await axios.get('/api/products');
      setProducts(data);
      /**[]: This empty array is the dependency array. It specifies that the effect 
       * should only run once, immediately after the component mounts. Since the 
       * dependency array is empty, the effect doesn't depend on any props or state 
       * changes, so it runs only once when the component mounts. */
    }

    fetchProducts();
  }, []);
  // [] : this is an array of dependencies that when you put something in here and 
  // that value changes , that useEffect is gonna run
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
