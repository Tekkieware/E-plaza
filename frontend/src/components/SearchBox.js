import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  let history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.location.pathname);
    }
  };
  return (
    <Form onSubmit={submitHandler} inline className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>

      <Button type="submit" variant="outline-success" className="2 btn-my">
        Submit
      </Button>
    </Form>
  );
}

export default SearchBox;
