import { Alert, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/User";
import "./Donw.css";

const Donw = ({
  productName,
  productCategory,
  productSubCategory,
  productDescription,
  productBrand,
  pic1,
  pic2,
  pic3,
  location,
  state,
  price,
  negotiable,
}) => {
  const [loading, setLoading] = useState(false);
  const [posted, setPosted] = useState(false);

  const { user, userData1 } = useContext(UserContext);
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/post",
        {
          userId: user ? user._id : null,
          productName,
          productCategory,
          productSubCategory,
          productDescription,
          productBrand,
          pic1,
          pic2,
          pic3,
          location,
          state,
          price,
          negotiable,
        },
        {
          headers: {
            "auth-token": userData1 ? userData1.token : null,
          },
        }
      );
      console.log(data);
      setPosted(true);
      try {
        const response = await axios.post(
          `http://localhost:4000/api/v1/views/post/${
            data ? data.msg._id : null
          }`
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setPosted(false);
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };
  return (
    <>
      <Snackbar open={posted} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Your Product Is Successfully Posted.
        </Alert>
      </Snackbar>
      {loading && (
        <CircularProgress style={{ margin: "0px auto", color: "black" }} />
      )}
      <h1
        style={{ color: "black", fontSize: "18px", marginTop: "20px" }}
        className="pt-3"
      >
        Information Provided Successfully.Please Check All The Details That Are
        Provided Before Posting.
      </h1>
      <button className="button__post__main" onClick={handlePost}>
        Go
      </button>
    </>
  );
};

export default Donw;
