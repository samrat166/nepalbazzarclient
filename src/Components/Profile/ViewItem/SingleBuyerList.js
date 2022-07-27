import { Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AddTaskIcon from "@mui/icons-material/AddTask";
import axios from "axios";
const SingleBuyerList = ({ value, sold, render, setRender, user }) => {
  console.log(user);
  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/sold/update/${value ? value._id : null}`,
        {
          email: value.buyerId ? value.buyerId.email : null,
          user: user ? user : null,
        }
      );
      console.log(data);
      setRender(!render);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Link
        to={`/user/detail/${value.buyerId ? value.buyerId._id : null}`}
        style={{ textDecoration: "none" }}
      >
        <Tooltip
          title={`View ${value.buyerId ? value.buyerId.name : null}'s Profile`}
        >
          <div
            className="h-full flex items-center border-gray-200 border p-1 w-full "
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              borderTopRightRadius: "10px",
              borderTopLeftRadius: "10px",
            }}
          >
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={value.buyerId ? value.buyerId.pic : null}
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                {value.buyerId ? value.buyerId.name : null}
              </h2>
              <p className="text-gray-500">
                {" "}
                {value.buyerId ? value.buyerId.email : null}
              </p>
            </div>
          </div>
        </Tooltip>
      </Link>
      {sold === false && (
        <div
          className="container p-1 cursor-pointer main__sell__to__buyer"
          style={{
            border: "1px solid lightgray",
          }}
          onClick={handleUpdate}
        >
          Sell To {value.buyerId ? value.buyerId.name : null}
          <AddTaskIcon className="ml-1" />
        </div>
      )}
    </>
  );
};

export default SingleBuyerList;
