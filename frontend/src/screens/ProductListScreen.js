import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginator from "../components/Paginator";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductListScreen({ history, match }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let keyword = history.location.search;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    keyword,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Please confirm to delete product")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-center">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> New Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger" children={errorDelete} />}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger" children={errorCreate} />}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <Row>
          <Col md={12}>
            <div>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>₦{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit`}
                        >
                          <Button variant="light" className="btn-sm">
                            <i
                              className="fas fa-edit"
                              style={{ color: "black" }}
                            ></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginator pages={pages} page={page} isAdmin={true} />
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductListScreen;
