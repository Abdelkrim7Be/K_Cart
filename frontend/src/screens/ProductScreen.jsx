import React from "react";
// So we are going to need to get the id from the URL , to do so , we need to use
// a hook called useParams :
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import products from "../products";
import Rating from '../components/Rating'

const ProductScreen = () => {
  // we gonna retrieve the id from the url and then find the product based on that id
  const { id: productId } = useParams();
  const product = products.find((p) => p._id === productId);
  // we are going to create a route based on that
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          {/* we are making it fluid so that she gets smaller by sizing */}
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                // we passed in the value and the text as arguments sent to the Rating Component
                value={product.rating}
                text={`${product.numReviews} reviews`}
                />
            </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              {/*  The variant="flush" attribute modifies the appearance of the 
              ListGroup component to remove borders and rounded corners from
              the list items, creating a more streamlined and modern look. */}
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                      <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                      <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                    Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
