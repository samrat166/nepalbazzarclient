import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "./ForgotPassword.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleClick = async () => {
    if (email === "") {
      setError("Email Cannot Be Empty");
    } else {
      try {
        const { data } = await axios.post(
          "http://localhost:4000/api/v1/user/forgot/password",
          { email }
        );
        console.log(data);
        setError("");
        setSent(true);
      } catch (error) {
        console.log(error);
        setError(error.response.data.msg);
      }
    }
  };

  const handleClose = () => {
    setSent(false);
  };
  return (
    <>
      <Snackbar open={sent} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Email Is Sent Successfully to {email}.
        </Alert>
      </Snackbar>
      <h1 className="mt-3">Please Enter Your Regsitered Email.</h1>
      {error && (
        <h1 className="mt-2" style={{ color: "red" }}>
          {error}
        </h1>
      )}
      <div style={{ width: "50%", margin: "0px auto", marginTop: "40px" }}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-600"
          style={{ textAlign: "left" }}
        >
          {" "}
          Email address{" "}
          <span
            style={{
              color: "red",
              fontSize: "15px",
            }}
          >
            *
          </span>{" "}
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter a Valid Email Address"
            className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div
        className="input__button__update__pass"
        style={{ width: "20%", margin: "0px auto", marginTop: "30px" }}
      >
        <button
          type="submit"
          className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
          onClick={handleClick}
        >
          Post
        </button>
      </div>
    </>
  );
};

export default ForgotPassword;
