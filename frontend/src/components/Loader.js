import { Spinner } from "react-bootstrap";
import React from "react";

function Loader() {
  return (
    <Spinner
      animation="grow"
      role="status"
      style={{
        height: "100px",
        width: "100px",
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
