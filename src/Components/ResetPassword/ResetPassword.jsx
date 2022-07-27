import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Backdrop, Snackbar, Tooltip } from "@mui/material";
import React, { useState, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ResetPassword = () => {
  const { token, email } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error1, setError1] = useState("");
  const [open, setopen] = useState(false);
  const [type, setType] = useState("password");
  const [on, setOn] = useState(false);
  const [bd, setBd] = useState(false);
  const [valid, setValid] = useState(false);

  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const handleClick = async () => {
    if (pass1 === "" || pass2 === "") {
      setError1("Fields Should Not Be Empty");
    } else {
      if (pass1 === pass2) {
        {
          if (strongRegex.test(pass1)) {
            try {
              const { data } = await axios.put(
                `http://localhost:4000/api/v1/user/reset/password/${email}`,
                { pass1 }
              );
              console.log(data);
              setopen(true);
              setPass1("");
              setPass2("");
              setError1("");
            } catch (error) {
              console.log(error.response.data.msg);
              setError1(error.response.data.msg);
            }
          } else {
            setBd(true);
          }
        }
      } else {
        setError1("New Password And Retyped Password Didnot Matched");
      }
    }
  };

  const handleClose = () => {
    setopen(false);
    setBd(false);
  };

  const handleChamge = () => {
    if (strongRegex.test(pass1)) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  useEffect(() => {
    const giveToken = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/reset/password/${token}`
        );
        console.log(data);
        setSuccess(true);
      } catch (error) {
        console.log(error.message);
        setError(error.response.data.msg);
        setSuccess(false);
      }
    };
    giveToken();
  }, []);
  return (
    <>
      {error && (
        <h1 style={{ margin: "10px auto", color: "red", fontSize: "30px" }}>
          {error}
        </h1>
      )}
      {success && (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={bd}
            onClick={handleClose}
          >
            <div
              className="container"
              style={{
                backgroundColor: "white",
                borderRadius: "30px",
                width: "50%",
                margin: "0px auto",
                padding: "30px",
              }}
            >
              <Tooltip title="Close">
                <CloseIcon
                  onClick={handleClose}
                  style={{
                    color: "black",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
              <ul style={{ color: "black", textAlign: "left" }}>
                <li className="mt-2">
                  {"--> "}The string must contain at least 1 lowercase
                  alphabetical character
                </li>
                <li className="mt-2">
                  {"--> "}The string must contain at least 1 uppercase
                  alphabetical character
                </li>
                <li className="mt-2">
                  {"--> "}The string must contain at least 1 numeric character
                </li>
                <li className="mt-2">
                  {"--> "}The string must contain at least one special character
                </li>
                <li className="mt-2">
                  {"--> "}The string must be eight characters or longer
                </li>
              </ul>
            </div>
          </Backdrop>
          {open && (
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Successfully Updated Password.
              </Alert>
            </Snackbar>
          )}

          <>
            <h1 className="mt-3 text-2xl mb-2">Update Your Password</h1>
            {error1 && (
              <h1
                className="text-red mt-2"
                style={{ color: "red ", margin: "10px 0px" }}
              >
                {error1}
              </h1>
            )}

            <div
              className="space-y-1 input__field__update"
              style={{ width: "40%", margin: "0px auto", marginTop: "20px" }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-600"
                style={{ textAlign: "left" }}
              >
                {" "}
                New Password{" "}
                <span
                  style={{
                    color: "red",
                    fontSize: "15px",
                  }}
                >
                  *
                </span>{" "}
                <span
                  style={{
                    color: "blue",
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => setBd(true)}
                >
                  Note
                </span>{" "}
              </label>
              <div
                className="mt-1"
                style={{ display: "flex", alignItems: "center" }}
              >
                {valid && (
                  <>
                    <span
                      style={{
                        color: "blue",
                        fontSize: "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => setBd(true)}
                    >
                      <Tooltip title="Your Password Is Strong">
                        <CheckCircleIcon
                          style={{
                            color: "green",
                            width: "30px",
                            height: "30px",
                            marginRight: "10px",
                          }}
                        />
                      </Tooltip>
                    </span>{" "}
                  </>
                )}
                <input
                  id="Password"
                  name="Password"
                  type={type}
                  autoComplete="current-Name"
                  required
                  placeholder="Password"
                  className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  value={pass1}
                  onChange={(e) => setPass1(e.target.value)}
                  onKeyUp={handleChamge}
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
            <div
              className="space-y-1 input__field__update"
              style={{ width: "40%", margin: "0px auto", marginTop: "20px" }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-600"
                style={{ textAlign: "left" }}
              >
                {" "}
                Retype New Password{" "}
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
                  value={pass2}
                  onChange={(e) => setPass2(e.target.value)}
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

            <div
              className="input__button__update__pass"
              style={{ width: "20%", margin: "0px auto", marginTop: "30px" }}
            >
              <button
                type="submit"
                className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
                onClick={handleClick}
              >
                Update
              </button>
            </div>
          </>
        </>
      )}
    </>
  );
};

export default ResetPassword;
