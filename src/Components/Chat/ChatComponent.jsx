import React, { useContext } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import { UserContext } from "../../Context/User";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Tooltip } from "@mui/material";
import io from "socket.io-client";

import DeleteIcon from "@mui/icons-material/Delete";
let socket;
const ChatComponent = ({ value, sellerID, index, data, setRender, render }) => {
  socket = io("localhost:4000");

  const { user } = useContext(UserContext);

  const handleDelete = async () => {
    const id = value._id;
    socket.emit("updateMsg", {
      id,
    });
    setRender(!render);
  };
  return (
    <>
      <section
        className="text-gray-600 body-font mt-6"
        id={index === data.length - 1 && "scrool"}
      >
        <div
          className={
            value.userId._id === sellerID
              ? "container px-5 py-1 mx-auto seller__message"
              : "container px-5 py-1 mx-auto"
          }
          style={{ borderRadius: "20px" }}
        >
          <div className="flex items-center lg:w-full mx-auto sm:flex-row flex-col">
            <div
              className="inline-flex items-center justify-center rounded-full  text-indigo-500 flex-shrink-0"
              style={{ position: "relative" }}
            >
              {user._id === value.userId._id && (
                <Tooltip title="Me">
                  <div
                    className="container"
                    style={{
                      position: "absolute",
                      top: "-25px",
                      color: "black",
                    }}
                  >
                    <ArrowDownwardIcon />
                  </div>
                </Tooltip>
              )}

              {sellerID === value.userId._id && (
                <Tooltip title="Seller">
                  <div
                    className="container"
                    style={{
                      position: "absolute",
                      top: "-13px",
                      left: "30px",
                      color: "green",
                    }}
                  >
                    <VerifiedIcon />
                  </div>
                </Tooltip>
              )}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Zayn_Wiki_%28cropped%29.jpg/800px-Zayn_Wiki_%28cropped%29.jpg"
                alt=""
                srcset=""
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                {value.userId._id === sellerID ? "Seller" : value.userId.name}
              </h2>
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                {value.userId.email}
              </h2>
              <p className="leading-relaxed text-base">"{value.message}"</p>
            </div>

            <div className="sm:text-left text-center mt-6 sm:mt-0">
              {user._id === value.userId._id && (
                <Tooltip title="Delete This Message">
                  <DeleteIcon
                    // onClick={handleDelete}
                    style={{ cursor: "pointer" }}
                  />
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </section>
      <hr />
    </>
  );
};

export default ChatComponent;
