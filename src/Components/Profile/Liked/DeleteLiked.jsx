import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";
import axios from "axios";

const DeleteLiked = ({ value, render, setRender, deleted, setDeleted }) => {
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/user/fav/delete/${
          value ? value._id : null
        }`
      );
      console.log(data);
      setRender(!render);
      setDeleted(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Tooltip title="Delete">
        <DeleteIcon className="cursor-pointer" onClick={handleDelete} />
      </Tooltip>
    </>
  );
};

export default DeleteLiked;
