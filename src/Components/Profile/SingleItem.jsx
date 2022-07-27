import React, { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./SingleItem.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const SingleItem = ({ value, setRender, render, setDeleted }) => {
  const { pathname } = useLocation();

  const [count, setCount] = useState(0);
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/post/delete/${value ? value._id : null}`
      );
      console.log(data);
      setRender(!render);
      setDeleted(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const addViews = async () => {
      try {
        try {
          const { data } = await axios.get(
            `http://localhost:4000/api/v1/views/postcount/${
              value ? value._id : null
            }`
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

  const [info, setInfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/sold/item/${value ? value._id : null}`
        );
        console.log(data);
        setInfo(data.length);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <li className="list-group-item    p-3 general__view__item mt-2">
        <div className="container d-flex">
          <img
            src={value.pic1}
            alt=""
            srcset=""
            style={{ width: "40px", height: "40px" }}
          />

          <div className="container-fluid">
            <p className="mb-0">{value.productName}</p>

            <p className="mb-0">Rs.{value.price}</p>
            {pathname === "/profile" && (
              <p className="mb-0">
                <VisibilityIcon /> {count}
              </p>
            )}
            {pathname === "/profile" && (
              <p className="mb-0">
                <p className="mb-0">{info.length !== 0 ? info : 0} Buyers</p>
              </p>
            )}

            {pathname !== "/profile" && (
              <Link
                to={`/detail/view/${value ? value._id : null}`}
                style={{
                  textDecoration: "none",
                  color: "blue",
                  marginTop: "20px",
                }}
              >
                <ArrowForwardIosIcon
                  style={{ width: "16px", height: "16px" }}
                />{" "}
                View This Product
              </Link>
            )}

            {pathname === "/profile" && (
              <Link
                to={`/item/${value ? value._id : null}`}
                style={{
                  textDecoration: "none",
                  color: "blue",
                  marginTop: "20px",
                }}
              >
                <ArrowForwardIosIcon
                  style={{ width: "16px", height: "16px" }}
                />{" "}
                View More
              </Link>
            )}
          </div>
          {pathname === "/profile" && (
            <Tooltip title="Delete">
              <DeleteOutlineOutlinedIcon
                style={{ marginLeft: "auto", cursor: "pointer" }}
                onClick={handleDelete}
              />
            </Tooltip>
          )}
        </div>
      </li>
    </>
  );
};

export default SingleItem;
