import { Backdrop, Skeleton, Tooltip } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ViewItem.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Magnifier from "react-magnifier";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BuyerList from "./BuyerList";
import { useContext } from "react";
import { UserContext } from "../../../Context/User";
import NoAuth from "../../NoAuth/NoAuth";

const ViewItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(1);
  const [count, setCount] = useState(0);
  const { user, error } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/post/one/${id}`
        );
        console.log(data);
        setItem(data.msg);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
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
  return (
    <>
      {error === "" ? (
        <>
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
                          borderRadius: "10px",
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
                          borderRadius: "10px",
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
                          borderRadius: "10px",
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
              <div className="col-10 col-md-8" style={{ margin: "0px auto" }}>
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
                              <u>Product Name</u>
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
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                  {item ? item.productCategory : null}
                                </h1>
                              </div>
                              <div className="container">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                  Product Sub-Category
                                </h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                  {item ? item.productSubCategory : null}
                                </h1>
                              </div>
                            </div>
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                              Is Negotiable?
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-3">
                              {item ? (item.negotiable ? "Yes" : "No") : null}
                            </h1>
                            <hr />

                            <div className="title-font font-medium text-2xl text-gray-900 mt-3">
                              Rs. {item ? item.price : null}
                            </div>

                            <div className="title-font font-medium text-xl text-gray-900 mt-2">
                              Total Views : {count}
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <BuyerList item={item} user={user} />
                  </>
                )}
              </div>
            </div>
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

export default ViewItem;
