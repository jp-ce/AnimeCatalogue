import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error-page">
      <Link to="/" className="btn btn-primary">
        Back to home
      </Link>

      <h1>oooops. something went wrong :(</h1>
    </div>
  );
};

export default Error;
