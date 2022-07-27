import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Backdrop, Tooltip } from "@mui/material";
import "./Settings.css";
import React, { useState, useContext } from "react";
import { UserContext } from "../../Context/User";
import NoAuth from "../NoAuth/NoAuth";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { apiRequestHelper } from "../../Helpers/ApiHelpers";
import SuccessMessage from "../../Common/SuccessMessage";

const Settings = () => {
  const { user, error } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    pass: "",
    pass1: "",
    pass2: "",
    error1: "",
    open: false,
    type: "password",
    on: false,
    bd: false,
    valid: false,
  });

  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const handleClick = async () => {
    if (
      userInfo.pass === "" ||
      userInfo.pass1 === "" ||
      userInfo.pass2 === ""
    ) {
      setUserInfo((userInfo) => ({
        ...userInfo,
        error1: "Fields Should Not Be Empty",
      }));
    } else {
      if (userInfo.pass1 === userInfo.pass2) {
        {
          if (strongRegex.test(userInfo.pass1)) {
            const apiRequest = await apiRequestHelper(
              `user/update/${user ? user._id : null}`,
              "put",
              { pass: userInfo.pass, pass1: userInfo.pass1 }
            );
            if (apiRequest.isError) {
              setUserInfo((userInfo) => ({
                ...userInfo,
                error1: apiRequest.message,
              }));
            } else {
              setUserInfo((userInfo) => ({
                ...userInfo,
                open: true,
              }));
              setUserInfo((userInfo) => ({
                ...userInfo,
                pass: "",
                pass1: "",
                pass2: "",
                error1: "",
              }));
            }
          } else {
            setUserInfo((userInfo) => ({ ...userInfo, bd: true }));
          }
        }
      } else {
        setUserInfo((userInfo) => ({
          ...userInfo,
          error1: "New Password And Retyped Password Didnot Matched",
        }));
      }
    }
  };

  const handleClose = () => {
    setUserInfo((userInfo) => ({
      ...userInfo,
      open: false,
      bd: false,
    }));
  };

  const handleChamge = () => {
    if (strongRegex.test(userInfo.pass1)) {
      setUserInfo((userInfo) => ({
        ...userInfo,
        valid: true,
      }));
    } else {
      setUserInfo((userInfo) => ({
        ...userInfo,
        valid: false,
      }));
    }
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={userInfo.bd}
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
              {"--> "}The string must contain at least 1 lowercase alphabetical
              character
            </li>
            <li className="mt-2">
              {"--> "}The string must contain at least 1 uppercase alphabetical
              character
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
      <SuccessMessage
        open={userInfo.open}
        handleClose={handleClose}
        message=" Successfully Updated Password."
      />

      {error === "" ? (
        <>
          <h1 className="mt-3 text-2xl mb-2">Update Your Password</h1>
          {userInfo.error1 && (
            <h1
              className="text-red mt-2"
              style={{ color: "red ", margin: "10px 0px" }}
            >
              {userInfo.error1}
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
              Old Password{" "}
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
                type={userInfo.type}
                autoComplete="current-Name"
                required
                placeholder="Password"
                className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                value={userInfo.pass}
                onChange={(e) =>
                  setUserInfo((userInfo) => ({
                    ...userInfo,
                    pass: e.target.value,
                  }))
                }
              />
              {userInfo.on ? (
                <Visibility
                  style={{
                    color: "black",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setUserInfo((userInfo) => ({
                      ...userInfo,
                      type: "password",
                      on: !userInfo.on,
                    }));
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
                    setUserInfo((userInfo) => ({
                      ...userInfo,
                      type: "text",
                      on: !userInfo.on,
                    }));
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
                onClick={() =>
                  setUserInfo((userInfo) => ({ ...userInfo, bd: true }))
                }
              >
                Note
              </span>{" "}
            </label>
            <div
              className="mt-1"
              style={{ display: "flex", alignItems: "center" }}
            >
              {userInfo.valid && (
                <>
                  <span
                    style={{
                      color: "blue",
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setUserInfo((userInfo) => ({ ...userInfo, bd: false }))
                    }
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
                type={userInfo.type}
                autoComplete="current-Name"
                required
                placeholder="Password"
                className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                value={userInfo.pass1}
                onChange={(e) =>
                  setUserInfo((userInfo) => ({
                    ...userInfo,
                    pass1: e.target.value,
                  }))
                }
                onKeyUp={handleChamge}
              />
              {userInfo.on ? (
                <Visibility
                  style={{
                    color: "black",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setUserInfo((userInfo) => ({
                      ...userInfo,
                      type: "password",
                      on: !userInfo.on,
                    }));
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
                    setUserInfo((userInfo) => ({
                      ...userInfo,
                      type: "text",
                      on: !userInfo.on,
                    }));
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
                type={userInfo.type}
                autoComplete="current-Name"
                required
                placeholder="Password"
                className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                value={userInfo.pass2}
                onChange={(e) =>
                  setUserInfo((userInfo) => ({
                    ...userInfo,
                    pass2: e.target.value,
                  }))
                }
              />
              {userInfo.on ? (
                <Visibility
                  style={{
                    color: "black",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setUserInfo((userInfo) => ({
                      ...userInfo,
                      type: "password",
                      on: !userInfo.on,
                    }));
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
                    setUserInfo((userInfo) => ({
                      ...userInfo,
                      type: "text",
                      on: !userInfo.on,
                    }));
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
      ) : (
        <>
          <NoAuth />
        </>
      )}
    </>
  );
};

export default Settings;
