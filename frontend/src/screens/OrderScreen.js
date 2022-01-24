import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, ListGroup, Image, Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { savePaymentMethod } from "../actions/cartActions";
import {
  getOrderDetails,
  deliverOrder,
  payOrder,
} from "../actions/orderAction";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import Loader from "../components/Loader";
import FlutterwavePayment from "../components/FlutterwavePayment";
function OrderScreen({ match, history }) {
  const orderId = match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (
      !order ||
      order._id !== Number(orderId) ||
      successPay ||
      successDeliver
    ) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId, successDeliver, successPay, history, userInfo]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" children={error} />
  ) : (
    <div>
      <h1>Order: {order._id} </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Information</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {"  "}
                {order.shippingAddress.postalCode},{"  "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered On {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Pending Delivery</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Information</h2>
              <p>
                <strong>Payment Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid On {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Information</h2>
              {order.orderItems.length === 0 ? (
                <Message children="Your order is empty" variant="info" />
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X ₦{item.price} = ₦
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Sumamry</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Order:</Col>
                  <Col>₦{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>₦{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>₦{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>₦{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}

              {!order.isPaid && (
                <ListGroup.Item>
                  <FlutterwavePayment
                    price={Number(order.totalPrice).toFixed(0)}
                    order={orderId}
                  />
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
