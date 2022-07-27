import React, { useContext, useEffect, useState } from "react";
import Profile from "./Profile";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Liked from "./Liked/Liked";
import "./Tabs.css";
import { UserContext } from "../../Context/User";
import NoAuth from "../NoAuth/NoAuth";

import ShopIcon from "@mui/icons-material/Shop";
import MyBuys from "./myBuys/MyBuys";
const Tabs = () => {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  const { user, error } = useContext(UserContext);

  const handleA = () => {
    setA(!a);
    setB(false);
    setC(false);
  };
  const handleB = () => {
    setB(!b);
    setA(false);
    setC(false);
  };
  const handleC = () => {
    setC(!c);
    setA(false);
    setB(false);
  };

  return (
    <>
      {error === "" ? (
        <>
          <div
            className="container-fluid"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              backgroundColor: "#EEEEEE",
              height: "40px",
            }}
          >
            <h1
              className={a ? "mt-2 active__tab__pro" : "mt-2"}
              style={{ cursor: "pointer" }}
              onClick={handleA}
            >
              <PersonIcon /> My Profile
            </h1>
            <h1
              className={b ? "mt-2 active__tab__pro" : "mt-2"}
              onClick={handleB}
              style={{ cursor: "pointer" }}
            >
              <FavoriteIcon /> Liked Items
            </h1>
            <h1
              className={c ? "mt-2 active__tab__pro" : "mt-2"}
              onClick={handleC}
              style={{ cursor: "pointer" }}
            >
              <ShopIcon /> My Buys
            </h1>
          </div>
          {a && <Profile />}
          {b && <Liked />}
          {c && <MyBuys />}
        </>
      ) : (
        <>
          <NoAuth />
        </>
      )}
    </>
  );
};

export default Tabs;
