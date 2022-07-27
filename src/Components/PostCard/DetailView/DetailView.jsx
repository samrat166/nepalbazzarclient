import { Alert, Backdrop, Skeleton, Snackbar, Tooltip } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./DetailView.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Magnifier from "react-magnifier";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useContext } from "react";
import { UserContext } from "../../../Context/User";
import RelatedProducts from "./RelatedProducts";
import RequestToBuy from "./RequestToBuy";
import BoughtOrNot from "./BoughtOrNot";
import LibraryAddCheckTwoToneIcon from "@mui/icons-material/LibraryAddCheckTwoTone";

const ViewItem = () => {
  const { id } = useParams();
  const [bought1, setBought1] = useState(false);
  const [item, setItem] = useState({});
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(1);
  const [count, setCount] = useState(0);
  const [added, setAdded] = useState(false);
  const [remover, setRemoved] = useState(false);
  const [liked, setLiked] = useState(false);
  const { user } = useContext(UserContext);
  const [render, setRender] = useState(false);
  const [fetch, setFetch] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/post/one/${id}`
        );
        setRender(!render);
        console.log(data);
        setItem(data.msg);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [fetch, pathname]);
  useEffect(() => {
    const addViews = async () => {
      try {
        try {
          const { data } = await axios.get(
            `http://localhost:4000/api/v1/views/postcount/${id}`
          );
          console.log(data);
          setCount(data.msg.count);
        } catch (error) {
          console.log(error.response.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    addViews();
  }, []);
  const handleOne = () => {
    setOne(true);
    setTwo(false);
    setThree(false);
  };
  const handleTwo = () => {
    setOne(false);
    setTwo(true);
    setThree(false);
  };
  const handleThree = () => {
    setOne(false);
    setTwo(false);
    setThree(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleIncr = () => {
    if (i === 3) {
      setI(1);
    } else {
      setI(i + 1);
    }
  };
  const handleDecr = () => {
    if (i === 1) {
      setI(3);
    } else {
      setI(i - 1);
    }
  };

  const handleLike = async () => {
    const userId = user ? user._id : null;
    const productId = item ? item._id : null;
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/like",
        { userId, productId }
      );
      setRender(!render);
      console.log(data);
      setLiked(true);
      setAdded(true);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleDelete = async () => {
    const userId = user ? user._id : null;
    const productId = item ? item._id : null;
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/user/like/${productId}/${userId}`
      );
      console.log(data);
      setLiked(false);
      setRender(!render);
      setRemoved(true);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    const fetchLike = async () => {
      try {
        const userId = user ? user._id : null;
        const productId = item ? item._id : null;
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/user/exists/${productId}/${userId}`
        );
        console.log(data);
        if (data !== "Invalid Id") {
          if (data.msg) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        } else {
          setRender(!render);
        }
      } catch (error) {
        console.log(error.response.data.msg);
        setLiked(false);
      }
    };
    fetchLike();
  }, [fetch, render]);

  const handleClose = () => {
    setRemoved(false);
    setAdded(false);
  };

  return (
    <>
      <Snackbar open={added} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Added To Liked Items.{"                 "}
          <Link
            to={`/profile`}
            style={{ fontWeight: "bold", textDecoration: "none" }}
          >
            View
          </Link>
        </Alert>
      </Snackbar>
      <Snackbar open={remover} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Removed From Liked Items
        </Alert>
      </Snackbar>
      {
        <Backdrop
          sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 3 }}
          open={open}
          style={{ opacity: "1" }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "white",
              position: "absolute",
              left: "0vw",
              cursor: "pointer",
            }}
            onClick={handleDecr}
          >
            <ArrowBackIosIcon
              style={{
                cursor: "pointer",

                width: "40px",
                height: "40px",
                zIndex: "100",
                marginTop: "5px",
              }}
            />
          </div>
          {i === 1 && (
            <Magnifier
              src={item ? item.pic1 : null}
              width={500}
              zoomFactor={1.5}
              mgWidth={200}
              mgHeight={200}
              className="jsdhfsghdj"
            />
          )}

          {i === 2 && (
            <Magnifier
              src={item ? item.pic2 : null}
              width={500}
              zoomFactor={1.5}
              mgWidth={200}
              mgHeight={200}
              className="jsdhfsghdj"
            />
          )}
          {i === 3 && (
            <Magnifier
              src={item ? item.pic3 : null}
              width={500}
              zoomFactor={1.5}
              mgWidth={200}
              mgHeight={200}
              className="jsdhfsghdj"
            />
          )}
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "white",
              position: "absolute",
              right: "0vw",
            }}
            onClick={handleIncr}
          >
            <ArrowForwardIosIcon
              style={{
                cursor: "pointer",

                width: "40px",
                height: "40px",
                zIndex: "100",
                marginTop: "5px",
              }}
            />
          </div>
          <h1
            style={{
              position: "absolute",
              top: "50px",
              color: "white",
            }}
          >
            Hover Over The Image To Zoom It.
          </h1>
          <Tooltip title="close">
            <CloseIcon
              style={{
                position: "absolute",
                top: "0",
                width: "35px",
                height: "35px",
                cursor: "pointer",
                color: "white",
              }}
              onClick={() => {
                setOpen(false);
                setI(1);
              }}
            />
          </Tooltip>
        </Backdrop>
      }
      <div
        className={open ? "opened__div" : "container mt-4"}
        style={{ marginBottom: "80px" }}
      >
        <div className="row">
          <div className="col-10 col-md-4" style={{ margin: "0px auto" }}>
            {loading ? (
              <>
                <Skeleton
                  variant="rectangular"
                  style={{
                    width: "100%",
                    height: "360px",
                    borderRadius: "10px",
                  }}
                />
                <div
                  className="container"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    margin: "20px auto",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "10px",
                    }}
                  />
                  <Skeleton
                    variant="rectangular"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "10px",
                    }}
                  />
                  <Skeleton
                    variant="rectangular"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                {one && (
                  <img
                    src={item ? item.pic1 : null}
                    alt=""
                    srcset=""
                    style={{
                      width: "100%",
                      height: "420px",
                      margin: "0px auto",
                    }}
                  />
                )}
                {two && (
                  <img
                    src={item ? item.pic2 : null}
                    alt=""
                    srcset=""
                    style={{
                      width: "100%",
                      height: "420px",
                      margin: "0px auto",
                    }}
                  />
                )}
                {three && (
                  <img
                    src={item ? item.pic3 : null}
                    alt=""
                    srcset=""
                    style={{
                      width: "100%",
                      height: "420px",
                      margin: "0px auto",
                    }}
                  />
                )}

                <div
                  className="container-fluid mt-3"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    margin: "0px auto",
                  }}
                >
                  <div>
                    <img
                      src={item ? item.pic1 : null}
                      alt=""
                      srcset=""
                      style={{
                        width: "60px",
                        height: "60px",
                        border: "1px solid lightgray",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      onClick={handleOne}
                    />
                    {one && <ArrowUpwardIcon />}
                  </div>
                  <div>
                    <img
                      src={item ? item.pic2 : null}
                      alt=""
                      srcset=""
                      style={{
                        width: "60px",
                        height: "60px",
                        border: "1px solid lightgray",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      onClick={handleTwo}
                    />
                    {two && <ArrowUpwardIcon />}
                  </div>
                  <div>
                    <img
                      src={item ? item.pic3 : null}
                      alt=""
                      srcset=""
                      style={{
                        width: "60px",
                        height: "60px",
                        border: "1px solid lightgray",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      onClick={handleThree}
                    />
                    {three && <ArrowUpwardIcon />}
                  </div>
                </div>
              </>
            )}
            <Tooltip title="View Zoomed Image">
              <h1
                className="mt-4 mb-4"
                onClick={handleOpen}
                style={{ cursor: "pointer" }}
              >
                Click to Zoom <VisibilityIcon />
              </h1>
            </Tooltip>
          </div>
          <div className="col-10 col-md-5" style={{ margin: "0px auto" }}>
            {loading ? (
              <>
                <Skeleton
                  variant="rectangular"
                  style={{
                    width: "100%",
                    height: "60vh",
                    borderRadius: "10px",
                  }}
                />
                <Skeleton
                  variant="rectangular"
                  style={{
                    width: "100%",
                    height: "30vh",
                    borderRadius: "10px",
                    marginTop: "40px",
                  }}
                />
              </>
            ) : (
              <>
                <section
                  className="text-gray-600 body-font overflow-hidden"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                  }}
                >
                  <div className="container   mx-auto">
                    <div className="w-full mx-auto flex flex-wrap">
                      <div className="lg:w-full w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                          Product Name
                        </h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                          {item ? item.productName : null}
                        </h1>

                        <p className="leading-relaxed">
                          {item ? item.productDescription : null}
                        </p>
                        <div className="container-fluid d-flex mt-4 w-full">
                          <div className="container-fluid">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                              Product Category
                            </h2>
                            <h1 className="text-gray-900 text-xl title-font font-medium mb-1">
                              {item ? item.productCategory : null}
                            </h1>
                          </div>
                          <div className="container-fluid">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                              Product Sub-Category
                            </h2>
                            <h1 className="text-gray-900 text-xl title-font font-medium mb-1">
                              {item ? item.productSubCategory : null}
                            </h1>
                          </div>
                          <div className="container-fluid">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                              Is Negotiable?
                            </h2>
                            <h1 className="text-gray-900 text-xl title-font font-medium mb-3">
                              {item ? (item.negotiable ? "Yes" : "No") : null}
                            </h1>
                          </div>
                        </div>

                        <hr />

                        <div
                          className="title-font font-medium text-2xl text-gray-900 mt-3 "
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          Price : Rs. {item ? item.price : null}
                          {!liked && (
                            <Tooltip title="Add To Favourite">
                              <FavoriteBorderOutlinedIcon
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  cursor: "pointer",
                                }}
                                onClick={handleLike}
                                className="FavoriteOutlinedIcon"
                              />
                            </Tooltip>
                          )}
                          {liked && (
                            <Tooltip title="Remove From Favourite">
                              <FavoriteOutlinedIcon
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  cursor: "pointer",
                                  color: "#880808",
                                }}
                                className="FavoriteOutlinedIcon"
                                onClick={handleDelete}
                              />
                            </Tooltip>
                          )}
                        </div>
                        <BoughtOrNot
                          item={item}
                          bought1={bought1}
                          setBought1={setBought1}
                          render={render}
                        />

                        <RequestToBuy
                          item={item}
                          bought1={bought1}
                          setBought1={setBought1}
                          render={render}
                          setRender={setRender}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Second Row */}

                <section
                  className="text-gray-600 body-font overflow-hidden mt-5"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                  }}
                >
                  <h2 className="text-sm text-3xl title-font text-gray-500 tracking-widest mt-1">
                    Seller's Info
                  </h2>
                  <img
                    src={item.userId ? item.userId.pic : null}
                    alt=""
                    srcset=""
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      margin: "0px auto",
                    }}
                  />
                  <h1 className="text-gray-900 title-font font-medium mb-1">
                    {item.userId ? item.userId.name : null}
                  </h1>
                  <div
                    className="container-fluid d-flex justify-content-center mt-3"
                    style={{ flexWrap: "wrap" }}
                  >
                    <h1 className="text-gray-900 title-font font-medium mb-1">
                      <EmailIcon /> {item.userId ? item.userId.email : null}
                    </h1>
                    <h1
                      className="text-gray-900 title-font font-medium mb-1 ml-2"
                      style={{ textAlign: "center" }}
                    >
                      <PhoneAndroidIcon />{" "}
                      {item.userId ? item.userId.number : null}
                    </h1>
                    <h1
                      className="text-gray-900 title-font font-medium mb-1 ml-2"
                      style={{ textAlign: "center" }}
                    >
                      <LocationOnIcon />{" "}
                      {item.userId ? item.userId.location : null}
                    </h1>
                  </div>
                  <Link
                    to={`/user/detail/${item.userId ? item.userId._id : null}`}
                  >
                    <button className="button__post__main__buy">
                      View Seller's Profile
                    </button>
                  </Link>
                </section>
              </>
            )}
          </div>
          <div className="col-md-3 col-10 related__products mt-3">
            <RelatedProducts
              item={item ? item : null}
              fetch={fetch}
              setFetch={setFetch}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewItem;
