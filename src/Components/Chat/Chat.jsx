import React, { useEffect, useState, useContext } from "react";
import "./Chat.css";
import io from "socket.io-client";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { UserContext } from "../../Context/User";
import NoAuth from "../NoAuth/NoAuth";
import ChatComponent from "./ChatComponent";

let socket;

const Chat = () => {
  socket = io("localhost:4000");
  const { user, error } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [render, setRender] = useState(false);

  const [render1, setRender1] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const userId = user ? user._id : null;
  const productId = "1234567";
  const sellerID = "62a6b57677332e1c348499b9";
  console.log(userId, productId);
  const handleClick = (e) => {
    e.preventDefault();
    if (message !== "") {
      socket.emit("main", {
        userId,
        productId,
        message,
      });
      setMessage("");
      setRender(!render);
    } else {
      console.log("Message Is Empty");
    }
  };

  useEffect(() => {
    socket.emit("getData", "Hello");
    setLoading(true);
    socket.on("getData", async (response) => {
      const main1 = response.filter((value) => {
        return value.productId === productId;
      });
      setData(main1);
      setLoading(false);
    });
  }, [render, render1]);

  return (
    <>
      <a href="#scrool" className="mt-2" style={{ marginTop: "10px" }}>
        View The Latest Message
      </a>
      {error === "" ? (
        <>
          <div
            className="container chat__main__div mb-6"
            style={{
              marginTop: "30px",
              borderRadius: "10px",

              marginBottom: "100px",
            }}
          >
            <>
              {data
                ? data.length === 0 && (
                    <h1 style={{ color: "black", marginTop: "20px" }}>
                      No Message Yet.
                    </h1>
                  )
                : null}
              {loading && (
                <CircularProgress
                  style={{
                    width: "35px",
                    height: "35px",
                    color: "gray",
                    marginTop: "20px",
                  }}
                />
              )}
              <div
                className="div"
                style={{
                  position: "sticky",
                  top: "70px",
                  zIndex: "100",
                  backgroundColor: "white",
                  height: "60px",
                }}
              >
                <div
                  className="mt-3 mb-2"
                  style={{
                    display: "flex",
                  }}
                >
                  <input
                    id="Name"
                    name="Name"
                    type="Message"
                    autoComplete="current-Name"
                    required
                    placeholder="Type..."
                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ width: "100%", height: "40px" }}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary ml-2"
                    style={{ color: "black" }}
                    onClick={handleClick}
                  >
                    Chat
                  </button>
                </div>
              </div>
              {data
                ? data.map((value, index) => {
                    return (
                      <>
                        <ChatComponent
                          value={value}
                          sellerID={sellerID}
                          index={index}
                          data={data}
                          setRender={setRender1}
                          render={render1}
                        />
                      </>
                    );
                  })
                : null}
            </>
          </div>
        </>
      ) : (
        <NoAuth />
      )}
    </>
  );
};

export default Chat;
