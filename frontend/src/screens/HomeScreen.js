import React, { useState, useEffect } from "react";
import { Col, Pagination, Row } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Paginator from "../components/Paginator";
import MyCarousel from "../components/MyCarousel";
function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = history.location.search;
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && (
        <div>
          <MyCarousel />
          <h3 class="my-header">Latest Products</h3>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message children={error} variant="danger" />
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginator page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
