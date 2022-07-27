import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../Context/User";

const UpdateAddress = ({ setOpen, setSuccess }) => {
  const { user, render1, setRender1 } = useContext(UserContext);
  const [address, setAddress] = useState(user ? user.location : "");
  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/user/updateaddress/${
          user ? user._id : null
        }`,
        { location: address }
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
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-600"
            style={{ textAlign: "left" }}
          >
            {" "}
            Update Your Address{" "}
            <span
              style={{
                color: "red",
                fontSize: "15px",
              }}
            >
              *
            </span>{" "}
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter Name"
              className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <button className="button__post__main" onClick={handleUpdate}>
          Update
        </button>
      </header>
    </>
  );
};

export default UpdateAddress;
