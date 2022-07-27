import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../Context/User";
import NoAuth from "../../NoAuth/NoAuth";

const RequestToBuy = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [bought, setBought] = useState(false);
  const [buy, setBuy] = useState(false);
  const [err, setErr] = useState(false);
  const { user, error } = useContext(UserContext);
  const handleBuy = async ({ setRender, render }) => {
    if (error === "") {
      setErr(false);
      try {
        const { data } = await axios.post(
          "http://localhost:4000/api/v1/sold/item",
          {
            buyerId: user ? user._id : null,
            sellerId: item.userId ? item.userId._id : null,
            productId: item ? item._id : null,
          }
        );
        console.log(data);
        setBuy(true);
        setRender(!render);
      } catch (error) {
        console.log(error.response.data.msg);
        setBuy(false);
        setBought(true);
      }
    } else {
      setErr(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setBought(false);
    setBuy(false);
    setErr(false);
  };
  return (
    <>
      {err && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={err}
          onClick={handleClose}
        >
          <div className="container buy__backdrop">
            <NoAuth />
          </div>
        </Backdrop>
      )}
      <Snackbar open={bought} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          You Have Already Requested To Buy This Item.
        </Alert>
      </Snackbar>
      <Snackbar open={buy} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Congratulation You Successfully Requested To Buy This Item.
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div
          className="container"
          style={{ backgroundColor: "white", width: "70%", margin: "0px auto" }}
        >
          <h1 className="text-gray-900">
            {item.userId ? item.userId.name : null}
          </h1>
        </div>
      </Backdrop>
      <button className="button__post__main__buy" onClick={handleBuy}>
        Buy This Product
      </button>
    </>
  );
};

export default RequestToBuy;
