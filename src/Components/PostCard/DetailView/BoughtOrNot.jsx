import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../Context/User";

const BoughtOrNot = ({ item, setRender, setBought1, render }) => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchBuy = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/sold/item/buyer/${
            item ? item._id : null
          }/${user ? user._id : null}`
        );
        console.log(data);
        setBought1(false);
      } catch (error) {
        console.log(error.response.data.msg);
        if (
          error.response.data.msg ===
          "You Have Already Requested To Buy This Item."
        ) {
          setBought1(true);
        } else {
          setBought1(false);
        }
      }
    };
    fetchBuy();
  }, [id, render]);
  return <></>;
};

export default BoughtOrNot;
