import React, { useEffect, useContext } from "react";
import "./Profile.css";
import ProfileSection from "./ProfileMain/ProfileSection";
import { UserContext } from "../../Context/User";
import NoAuth from "../NoAuth/NoAuth";
import axios from "axios";
import { useState } from "react";
import SingleItem from "./SingleItem";
import { Alert, Skeleton, Snackbar } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Link } from "react-router-dom";
import MyRatings from "./MyRatings";

const Profile = () => {
  const { user, error } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [render, setRender] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userInfo"));

  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/post/oneuser/${
            userData ? userData._id : null
          }`
        );
        console.log(data);
        setItems(data.msg);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
        setLoading(false);
      }
    };
    fetchData();
  }, [render]);
  const handleClose = () => {
    setDeleted(false);
  };

  return (
    <>
      <Snackbar open={deleted} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Item Deleted Successfully.
        </Alert>
      </Snackbar>
      {error === "" ? (
        <>
          <section>
            <div className="container py-5">
              <div className="row">
                <div className="col-lg-4">
                  <ProfileSection />
                  <div className="card mb-4 mb-lg-0">
                    <div className="card-body p-0 ">
                      {items
                        ? items.length !== 0 && (
                            <p className="mb-1 font-3xl mt-1">
                              All posts ({items ? items.length : null})
                            </p>
                          )
                        : null}

                      {items
                        ? items.length === 0 && (
                            <>
                              <h1 className="p-2">No Posts To Show.</h1>
                              <Link to="/post">
                                <h1 className="p-2">
                                  <PostAddIcon /> Add Post
                                </h1>
                              </Link>
                            </>
                          )
                        : null}
                      <ul className="list-group  list-group-flush rounded-3">
                        {loading ? (
                          <>
                            <Skeleton
                              variant="rectangular"
                              style={{
                                width: "100%",
                                height: "130px",
                              }}
                            />
                            <Skeleton
                              variant="rectangular"
                              style={{
                                width: "100%",
                                height: "130px",

                                marginTop: "5px",
                              }}
                            />
                            <Skeleton
                              variant="rectangular"
                              style={{
                                width: "100%",
                                height: "130px",

                                marginTop: "5px",
                              }}
                            />
                          </>
                        ) : (
                          <>
                            {items
                              ? items.map((value) => {
                                  return (
                                    <>
                                      <SingleItem
                                        value={value}
                                        render={render}
                                        setRender={setRender}
                                        setDeleted={setDeleted}
                                      />
                                    </>
                                  );
                                })
                              : null}
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="card mb-4">
                    <p className="mb-1 font-3xl mt-1">Personal Details</p>
                    <div className="text-left card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Full Name</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {user ? user.name : null}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {user ? user.email : null}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Phone</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {user ? user.number : null}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Mobile</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {user ? user.number : null}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Address</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {user ? user.location : null}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card mb-4 mb-md-0">
                        <div className="card-body">
                          <p className="mb-4">User Rating</p>
                          <p className="mb-1" style={{ fontSize: ".77rem" }}>
                            Inbox response rate{" "}
                          </p>
                          <div
                            className="progress rounded"
                            style={{ height: 5 }}
                          >
                            <div
                              className="progress-bar  bg-yellow-500 "
                              role="progressbar"
                              style={{ width: "50%" }}
                              aria-valuenow={80}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                          <p
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            Order response time
                          </p>
                          <div
                            className="progress rounded"
                            style={{ height: 5 }}
                          >
                            <div
                              className="progress-bar  bg-yellow-500"
                              role="progressbar"
                              style={{ width: "72%" }}
                              aria-valuenow={72}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                          <p
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            Delivered on time
                          </p>
                          <div
                            className="progress rounded"
                            style={{ height: 5 }}
                          >
                            <div
                              className="progress-bar  bg-yellow-500"
                              role="progressbar"
                              style={{ width: "89%" }}
                              aria-valuenow={89}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                          <p
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            Order completion{" "}
                          </p>
                          <div
                            className="progress rounded"
                            style={{ height: 5 }}
                          >
                            <div
                              className="progress-bar  bg-yellow-500"
                              role="progressbar"
                              style={{ width: "55%" }}
                              aria-valuenow={55}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                          <p
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            Behavior
                          </p>
                          <div
                            className="progress rounded mb-2"
                            style={{ height: 5 }}
                          >
                            <div
                              className="progress-bar  bg-yellow-500"
                              role="progressbar"
                              style={{ width: "66%" }}
                              aria-valuenow={66}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card mb-4 mb-md-0">
                        <MyRatings />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <NoAuth />
        </>
      )}
    </>
  );
};

export default Profile;
