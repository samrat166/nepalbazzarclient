import { Skeleton } from "@mui/material";
import React from "react";
import { useState } from "react";

const Steps2 = ({ pic1, setpic1, pic2, setpic2, pic3, setpic3 }) => {
  const [picLoader, setPicLoader] = useState(false);
  const [picLoader1, setPicLoader1] = useState(false);
  const [picLoader2, setPicLoader2] = useState(false);

  const postDetails = (pics) => {
    setPicLoader(true);
    const data = new FormData();
    data.append("file", pics);

    data.append("upload_preset", "zfwzbdlg");

    data.append("cloud_name", "dpwgvr1b7");

    fetch("https://api.cloudinary.com/v1_1/dpwgvr1b7/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setpic1(data.url.toString());
        setPicLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setPicLoader(false);
      });
  };

  const postDetails1 = (pics) => {
    setPicLoader1(true);
    const data = new FormData();
    data.append("file", pics);

    data.append("upload_preset", "zfwzbdlg");

    data.append("cloud_name", "dpwgvr1b7");

    fetch("https://api.cloudinary.com/v1_1/dpwgvr1b7/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setpic2(data.url.toString());
        setPicLoader1(false);
      })
      .catch((err) => {
        console.log(err);
        setPicLoader1(false);
      });
  };

  const postDetails2 = (pics) => {
    setPicLoader2(true);
    const data = new FormData();
    data.append("file", pics);

    data.append("upload_preset", "zfwzbdlg");

    data.append("cloud_name", "dpwgvr1b7");

    fetch("https://api.cloudinary.com/v1_1/dpwgvr1b7/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setpic3(data.url.toString());
        setPicLoader2(false);
      })
      .catch((err) => {
        console.log(err);
        setPicLoader2(false);
      });
  };
  console.log(pic2);
  return (
    <>
      <h1 style={{ color: "black", fontSize: "18px" }} className="pt-3">
        Select Images For Your Product
      </h1>
      <h1 style={{ color: "black", fontSize: "15px" }} className="pt-3">
        You Have To Select Atleast 1 Image or Maximum 3 Images.
      </h1>
      <div
        className="container image__choose__main"
        style={{ marginTop: "30px" }}
      >
        <div className="row mt-4 container">
          <div className="col-7 ">
            <div>
              <h1
                style={{
                  color: "black",
                  fontSize: "18px",
                  textAlign: "left",
                  textDecoration: "underline",
                }}
                className="pt-3"
              >
                Select Image 1 For Your Product
              </h1>
              <input
                class="form-control"
                type="file"
                id="formFile"
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
                style={{ marginTop: "6px" }}
              />
            </div>
          </div>
          <div className="col-5 ">
            {picLoader ? (
              <Skeleton
                variant="circular"
                width={70}
                height={70}
                style={{ marginLeft: "auto", marginTop: "20px" }}
              />
            ) : (
              <img
                src={pic1}
                alt=" "
                srcset=""
                style={{
                  width: "70px",
                  height: "70px",
                  marginLeft: "auto",
                  marginTop: "20px",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
        </div>
        <div className="row mt-4 container">
          <div className="col-7 ">
            <h1
              style={{
                color: "black",
                fontSize: "18px",
                textAlign: "left",
                textDecoration: "underline",
              }}
              className="pt-3"
            >
              Select Image 2 For Your Product
            </h1>
            <input
              class="form-control"
              type="file"
              id="formFile"
              accept="image/*"
              onChange={(e) => postDetails1(e.target.files[0])}
              style={{ marginTop: "6px" }}
            />
          </div>
          <div className="col-5 ">
            {picLoader1 ? (
              <Skeleton
                variant="circular"
                width={70}
                height={70}
                style={{ marginLeft: "auto", marginTop: "20px" }}
              />
            ) : (
              <img
                src={pic2}
                alt=""
                srcset=""
                style={{
                  width: "70px",
                  height: "70px",
                  marginLeft: "auto",
                  marginTop: "20px",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
        </div>
        <div className="row mt-4 container">
          <div className="col-7 ">
            <h1
              style={{
                color: "black",
                fontSize: "18px",
                textAlign: "left",
                textDecoration: "underline",
              }}
              className="pt-3"
            >
              Select Image 3 For Your Product
            </h1>
            <input
              class="form-control"
              type="file"
              id="formFile"
              accept="image/*"
              onChange={(e) => postDetails2(e.target.files[0])}
              style={{ marginTop: "6px" }}
            />
          </div>
          <div className="col-5 ">
            {picLoader2 ? (
              <Skeleton
                variant="circular"
                width={70}
                height={70}
                style={{ marginLeft: "auto", marginTop: "20px" }}
              />
            ) : (
              <img
                src={pic3}
                alt=""
                srcset=""
                style={{
                  width: "70px",
                  height: "70px",
                  marginLeft: "auto",
                  marginTop: "20px",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Steps2;
