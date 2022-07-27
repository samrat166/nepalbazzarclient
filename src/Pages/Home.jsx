import React, { useState } from "react";
import { Link } from "react-router-dom";
import Category from "../Components/Category/Category";
import HowToBecomeASeller from "../Components/HowToBecomeASeller/HowToBecomeASeller";
import PostByLocation from "../Components/PostByLocation/PostByLocation";
import LatestPost from "../Components/PostCard/LatestPost/LatestPost";

const Home = () => {
  const [button, setButton] = useState([
    {
      route: "/latest-post",
      name: "Latest Items",
    },
    {
      route: "/trending-post",
      name: "Trending Items",
    },
    {
      route: "/most-viewed",
      name: "Most Viewed",
    },
  ]);
  return (
    <>
      <Category />
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="container  py-3 mx-auto"
      >
        {button.map(({ route, name }) => {
          return (
            <Link to={`${route}`}>
              <button
                type="button"
                className="m-1 Items__categroy btn btn-outline-success"
              >
                {name}
              </button>
            </Link>
          );
        })}
      </div>
      <LatestPost />
      <PostByLocation />
      <HowToBecomeASeller />
    </>
  );
};

export default Home;
