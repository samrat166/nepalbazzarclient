import { Skeleton, Tooltip } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../../Context/User";
import CloseIcon from "@mui/icons-material/Close";

const Update = ({ setOpen, setSuccess }) => {
  const { user, render1, setRender1 } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState("");
  const [img, setImg] = useState(user ? user.pic : null);
  const [loader, setLoader] = useState(false);
  const postDetails = (pics) => {
    const data = new FormData();
    setLoading(true);
    data.append("file", pics);

    data.append("upload_preset", "ml_default");

    data.append("cloud_name", "mechi-pharma1233");

    fetch("https://api.cloudinary.com/v1_1/mechi-pharma1233/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        setImg(data.url.toString());
        setLoader(true);
        console.log(pic);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/user/updateimage/${
          user ? user._id : null
        }`,
        { pic }
      );
      console.log(data);
      setRender1(!render1);
      setOpen(false);
      setSuccess(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <header className="flex flex-col items-center justify-center py-12 text-base transition duration-500 ease-in-out transform bg-white border border-dashed rounded-lg text-blueGray-500 focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 p-3">
        <Tooltip title="Close">
          <CloseIcon
            style={{
              color: "black",
              width: "40px",
              height: "40px",
              cursor: "pointer",
            }}
            onClick={() => setOpen(false)}
          />
        </Tooltip>
        <label
          htmlFor="img"
          className="block text-sm font-medium text-neutral-600"
          style={{ textAlign: "left" }}
        >
          {" "}
          Please Choose Your New Profile Picture{" "}
          <span
            style={{
              color: "red",
              fontSize: "15px",
            }}
          >
            *
          </span>{" "}
        </label>

        {img !== null && (
          <>
            {loading ? (
              <Skeleton variant="circular" width={130} height={130} />
            ) : (
              <img
                src={img}
                alt=""
                id="img"
                style={{
                  width: "130px",
                  height: "130px",
                  borderRadius: "50%",
                }}
              />
            )}
          </>
        )}

        <div className="mt-4">
          <input
            class="form-control"
            type="file"
            id="formFile"
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
            style={{ marginTop: "6px" }}
          />
        </div>
        {loader && (
          <button className="button__post__main" onClick={handleUpdate}>
            Update
          </button>
        )}
      </header>
    </>
  );
};

export default Update;
