import { Spinner } from "react-bootstrap";
import React from "react";

function Loader() {
  return (
    <Spinner
      animation="grow"
      role="status"
      style={{
        height: "200px",
        width: "200px",
        margin: "auto",
        display: "block",
        color: "#f85b00",
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}

export default Loader;
