import React, { useState } from "react";
import "./Registration.css";
import { Alert, Skeleton, Snackbar } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();
  const [img, setImg] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_s4GT2e6gM-unEm9qJbBXCRVTePF2tBKEjKpOpKB8LCRyZdXF1Ek1t5BHENSAp7SG2ow&usqp=CAU"
  );

  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("password");
  const [on, setOn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [pass, setpass] = useState("");
  const { pathname } = useLocation();

  const postDetails = (pics) => {
    const data = new FormData();
    setLoading(true);
    data.append("file", pics);

    data.append("upload_preset", "ml_default");

    data.append("cloud_name", "mechi-pharma1233");

    fetch("https://api.cloudinary.com/v1_1/mechi-pharma1233/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        setImg(data.url.toString());
        console.log(pic);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (
      pic !== "" &&
      name !== "" &&
      email !== "" &&
      number !== "" &&
      location !== "" &&
      password !== ""
    ) {
      if (pass === password) {
        try {
          const { data } = await axios.post(
            "http://localhost:4000/api/v1/user/register",
            {
              name,
              email,
              password,
              pic,
              number,
              location,
            }
          );
          console.log(data);
          setOpen(true);
          setError("");
          setName("");
          setEmail("");
          setLocation("");
          setNumber("");
          setPassword("");
          setTimeout(() => {
            navigate("/login", { state: { email, prevPath: pathname } });
          }, 1000);
        } catch (error) {
          setError(error.response.data.msg);
          window.scrollTo(0, 0);
        }
      } else {
        setError("Passwords Didnot Matched");
        window.scrollTo(0, 0);
      }
    } else {
      setError("Fields Are Empty");
      window.scrollTo(0, 0);
    }
  };

  const handleClose = () => setOpen(false);
  return (
    <>
      {open && (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Registration Successfull.Redirecting To Login....
          </Alert>
        </Snackbar>
      )}
      <h1 style={{ fontSize: "25px", margin: "10px 0px" }}>
        Welcome To Nepal Bazzar . Please Register To Continue.
      </h1>
      <div classname="container">
        {error && <h1 style={{ color: "red" }}>{error}</h1>}
        <section>
          <div className=" items-center px-5 lg:px-20">
            <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
              <div>
                <section className="flex flex-col w-full h-full p-1 overflow-auto">
                  <header className="flex flex-col items-center justify-center py-12 text-base transition duration-500 ease-in-out transform bg-white border border-dashed rounded-lg text-blueGray-500 focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
                    <label
                      htmlFor="img"
                      className="block text-sm font-medium text-neutral-600"
                      style={{ textAlign: "left" }}
                    >
                      {" "}
                      Please Select Your Profile Picture{" "}
                      <span
                        style={{
                          color: "red",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>{" "}
                    </label>

                    {img !== null && (
                      <>
                        {loading ? (
                          <Skeleton
                            variant="circular"
                            width={130}
                            height={130}
                          />
                        ) : (
                          <img
                            src={img}
                            alt=""
                            id="img"
                            style={{
                              width: "130px",
                              height: "130px",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </>
                    )}

                    <div className="mt-4">
                      <input
                        class="form-control"
                        type="file"
                        id="formFile"
                        accept="image/*"
                        onChange={(e) => postDetails(e.target.files[0])}
                        style={{ marginTop: "6px" }}
                      />
                    </div>
                  </header>
                </section>
                <div className="mt-6">
                  <form action="#" method="POST" className="space-y-6">
                    <div className="grid grid-cols-1 gap-2 ">
                      <div className="space-y-1">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-neutral-600"
                          style={{ textAlign: "left" }}
                        >
                          {" "}
                          Name{" "}
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
                            id="Name"
                            name="Name"
                            type="Name"
                            autoComplete="current-Name"
                            required
                            placeholder="(First name, Middle Name, Last name)"
                            className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
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

                      <div className="space-y-1">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-neutral-600"
                          style={{ textAlign: "left" }}
                        >
                          {" "}
                          Retype Password{" "}
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
                            placeholder="Retype Password"
                            className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                            value={pass}
                            onChange={(e) => setpass(e.target.value)}
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
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-neutral-600"
                          style={{ textAlign: "left" }}
                        >
                          {" "}
                          Phone Number{" "}
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
                            id="number"
                            name="number"
                            type="number"
                            autoComplete="number"
                            required
                            placeholder="Your Number"
                            className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-neutral-600"
                          style={{ textAlign: "left" }}
                        >
                          {" "}
                          Address{" "}
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
                            id="Address"
                            name="Address"
                            type="text"
                            autoComplete="Address"
                            required
                            placeholder="Your Address"
                            className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={handleClick}
                      >
                        Register
                      </button>
                    </div>
                  </form>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 text-neutral-600 bg-white">
                        {" "}
                        Already a user?{" "}
                        <Link
                          style={{ color: "blue" }}
                          to={{
                            pathname: "/login",
                          }}
                        >
                          Login
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

export default Registration;
