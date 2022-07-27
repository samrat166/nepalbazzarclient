import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import ReactStars from "react-stars";
import { Tooltip } from "@mui/material";

const SIngleRating = ({ value, setRender, render }) => {
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/rate/${value ? value._id : null}`
      );
      console.log(data);
      setRender(!render);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="container-fluid mt-2 mb-2 d-flex align-items-center justify-content-center">
        <img
          src={value.from ? value.from.pic : null}
          alt=""
          srcset=""
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <ReactStars
          count={5}
          value={value ? value.value : null}
          size={28}
          color2={"#FDCC0D"}
          style={{ marginLeft: "50px" }}
          edit={false}
        />
        <h1 style={{ fontWeight: "bold", marginLeft: "10px" }}>
          {value ? value.value : null}/5
        </h1>
        <Tooltip
          title={`Delete ${value.from ? value.from.name : null}'s Rating`}
        >
          <DeleteIcon
            style={{
              fontWeight: "bold",
              marginLeft: "10px",
              cursor: "pointer",
            }}
            onClick={handleDelete}
          />
        </Tooltip>
      </div>
    </>
  );
};

export default SIngleRating;
