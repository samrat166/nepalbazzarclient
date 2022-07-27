import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { CircularProgress } from "@mui/material";
const Login = () => {
  const location = useLocation();

  const [type, setType] = useState("password");
  const [on, setOn] = useState(false);
  const [email, setEmail] = useState(
    location.state !== null ? location.state.email : ""
  );

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (email === "") {
      setError("Email Cann't Be Empty");
    } else if (password === "") {
      setError("Password Cann't Be Empty");
    } else {
      try {
        setloading(true);
        const { data } = await axios.post(
          "http://localhost:4000/api/v1/user/login",
          { email, password }
        );
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        setError("");
        setloading(false);
        if (location.state) {
          if (location.state.prevPath === "/register") {
            navigate("/");
          }
        } else {
          navigate(-1);
        }
      } catch (error) {
        console.log(error.response.data.msg);
        setloading(false);
        setError(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    } else {
      console.log("hellll");
    }
  }, [location.pathname]);

  return (
    <>
      <h1 style={{ fontSize: "25px", margin: "10px 0px" }}>
        Welcome To Nepal Bazzar . Please Login To Continue.
      </h1>
      <div classname="container">
        {error && <h1 style={{ color: "red" }}>{error}</h1>}
        {loading && (
          <CircularProgress
            style={{ color: "gray", width: "30px", height: "30px" }}
          />
        )}
        <section>
          <div className=" items-center px-5 lg:px-20">
            <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
              <div>
                <div className="mt-6">
                  <form action="#" method="POST" className="space-y-6">
                    <div className="grid grid-cols-1 gap-2 ">
                      <div>
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
                      <div className="space-y-1">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-neutral-600"
                          style={{ textAlign: "left" }}
                        >
                          {" "}
                          Password{" "}
                          <span
                            style={{
                              color: "red",
                              fontSize: "15px",
                            }}
                          >
                            *
                          </span>{" "}
                        </label>
                        <div
                          className="mt-1"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            id="Password"
                            name="Password"
                            type={type}
                            autoComplete="current-Name"
                            required
                            placeholder="Password"
                            className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {on ? (
                            <Visibility
                              style={{
                                color: "black",
                                marginLeft: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setType("password");
                                setOn(!on);
                              }}
                            />
                          ) : (
                            <VisibilityOff
                              style={{
                                color: "black",
                                marginLeft: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setType("text");
                                setOn(!on);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={handleClick}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <div className="text-sm mt-3">
                    <Link
                      to={"/forgot/password"}
                      className="font-medium text-blue-600 hover:text-blue-500 mt-3"
                      style={{ marginTop: "30px" }}
                    >
                      {" "}
                      Forgot your password?{" "}
                    </Link>
                  </div>

                  <div className="relative my-4">
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 text-neutral-600 bg-white">
                        {" "}
                        Not a user?{" "}
                        <Link style={{ color: "blue" }} to="/register">
                          Register
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
