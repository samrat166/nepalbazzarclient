import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
const NoAuth = () => {
  return (
    <>
      <div className="container">
        <h1 className="text-2xl mt-2">Sorry you are not authenticated.</h1>
        <h1 className="mt-2">Please login to continue.</h1>
        <Link to="/login">
          <button className="button__post__main">
            Login <LoginIcon />
          </button>
        </Link>
      </div>
    </>
  );
};

export default NoAuth;
