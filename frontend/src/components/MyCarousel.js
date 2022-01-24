import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image, Card, Button, ListGroup } from "react-bootstrap";
import Loader from "./Loader";
import Rating from "./Rating";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

function MyCarousel() {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" children={error} />
  ) : (
    <Carousel className="bg-my" pause="hover">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Card className="text-center">
              <Card.Header as="h4">
                <i class="fa fa-fire fa-custom"></i>{" "}
                <i class="fa fa-fire fa-custom"></i>{" "}
                <i class="fa fa-fire fa-custom"></i>{" "}
                <i class="fa fa-fire fa-custom"></i>{" "}
                <i class="fa fa-fire fa-custom"></i>{" "}
              </Card.Header>
              <Card.Body>
                <Link to={`/product/${product._id}`}>
                  <Card.Img
                    src={product.image}
                    alt="Card image"
                    class="img-fuid"
                  />
                </Link>
              </Card.Body>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                      color={"#f8e825"}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ₦{product.price}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MyCarousel;
