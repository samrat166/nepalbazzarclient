import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./PostCard.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../Context/User";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
const PostCard = ({ value }) => {
  const { user } = useContext(UserContext);
  const [sold, setSold] = useState(false);
  const timeInMinute =
    (new Date().getTime() - new Date(value.updatedAt).getTime()) / 60000;

  const timeInHumanReadableForm = moment
    .duration(timeInMinute, "minutes")
    .humanize();
  const handleView = async () => {
    if (value) {
      if (value.userId._id !== user._id) {
        try {
          const { data } = await axios.get(
            `http://localhost:4000/api/v1/views/post/${
              value ? value._id : null
            }`
          );
          setSold(true);
        } catch (error) {
          console.log(error.response.data);
        }
      }
    } else {
      console.log("Same User");
    }
  };
  const date = new Date(value ? value.createdAt : null);

  useEffect(() => {
    const fetchSold = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/sold/ornot/${value ? value._id : null}`
        );
        if (data !== null) {
          setSold(true);
        } else {
          setSold(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSold();
  }, []);
  return (
    <>
      <div style={{ textAlign: "left", marginTop: "30px" }}>
        {user && value.userId ? (
          user._id === value.userId._id ? (
            <Link
              to={`/item/${value ? value._id : null}`}
              className="block relative h-48  overflow-hidden"
            >
              {sold && <div class="sold-item">SOLD</div>}
              <img
                alt="ecommerce"
                className="Product__image object-cover object-center w-full h-full block"
                src={value ? value.pic1 : null}
                style={{ width: "100%", height: "250px" }}
                onClick={handleView}
              />
            </Link>
          ) : (
            <Link
              to={`/detail/view/${value ? value._id : null}`}
              className="block relative h-48  overflow-hidden"
            >
              {sold && <div class="sold-item">SOLD</div>}

              <img
                alt="ecommerce"
                className="Product__image object-cover object-center w-full h-full block"
                src={value ? value.pic1 : null}
                style={{ width: "100%", height: "250px" }}
                onClick={handleView}
              />
            </Link>
          )
        ) : null}
        <div
          style={{ backgroundColor: "#EFEFEF", height: "150px" }}
          className="mt-1 p-1 "
        >
          <div className="d-flex align-items-center mt-1 mb-1 ml-1">
            {user && value.userId ? (
              user._id === value.userId._id ? (
                <Link to={`/profile`}>
                  <Tooltip
                    title={`View ${
                      value.userId ? value.userId.name : null
                    }'s Profile`}
                  >
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        alt="Remy Sharp"
                        src={value.userId ? value.userId.pic : null}
                        sx={{ width: 24, height: 24 }}
                      />
                    </Stack>
                  </Tooltip>
                </Link>
              ) : (
                <Link
                  to={`/user/detail/${value.userId ? value.userId._id : null}`}
                >
                  <Tooltip
                    title={`View ${
                      value.userId ? value.userId.name : null
                    }'s Profile`}
                  >
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        alt="Remy Sharp"
                        src={value.userId ? value.userId.pic : null}
                        sx={{ width: 24, height: 24 }}
                      />
                    </Stack>
                  </Tooltip>
                </Link>
              )
            ) : null}

            <h2 className="ml-2">{value.userId ? value.userId.name : null}</h2>
          </div>
          <h3 className="text-gray-600 text-sm font-medium tracking-widest title-font  ml-1">
            {value ? value.productName : null}
            <h3 className="text-gray-500 text-xs font-bold tracking-widest title-font  ">
              <span className="text-gray-700 text-xs">Condition:</span>
              {value ? value.state : null}
            </h3>

            <p style={{ fontSize: "11px" }}>
              {" "}
              <AccessTimeIcon
                className="mb-1"
                style={{ fontSize: "16px" }}
              />{" "}
              {value ? timeInHumanReadableForm + " ago" : null}
              {user && value.userId ? (
                user._id === value.userId._id ? (
                  <Link
                    to={`/item/${value ? value._id : null}`}
                    className="hover:text-yellow-600 "
                  >
                    <Tooltip title="View This Product">
                      <VisibilityIcon
                        fontSize="small"
                        className="float-right  mr-2"
                        onClick={handleView}
                      />
                    </Tooltip>
                  </Link>
                ) : (
                  <Link
                    to={`/detail/view/${value ? value._id : null}`}
                    className="hover:text-yellow-600 "
                  >
                    <Tooltip title="View This Product">
                      <VisibilityIcon
                        fontSize="small"
                        className="float-right  mr-2"
                        onClick={handleView}
                      />
                    </Tooltip>
                  </Link>
                )
              ) : null}
            </p>
          </h3>
          <h2 className="text-gray-900  text-sm title-font font-">
            {value ? value.productDescription.slice(0, 25) : null}....
          </h2>
        </div>
      </div>
    </>
  );
};

export default PostCard;
