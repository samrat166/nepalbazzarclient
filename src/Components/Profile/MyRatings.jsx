import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import ReactStars from "react-stars";
import { UserContext } from "../../Context/User";
import SIngleRating from "./SIngleRating";
import "./MyRatings.css";

const MyRatings = () => {
  const [ratings, setRatings] = useState([]);
  const { user } = useContext(UserContext);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/rate/${user ? user._id : null}`
        );
        console.log(data);
        if (data === "Invalid ID") {
          setRender(!render);
        } else {
          setRatings(data.msg);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [render]);

  const averageRating = ratings
    ? ratings.reduce((a, b) => {
        return a + b.value / ratings.length;
      }, 0)
    : null;

  return (
    <>
      <div className="ratings__user__main">
        {loading ? (
          <CircularProgress style={{ color: "black", margin: "10px auto" }} />
        ) : (
          <>
            {ratings.length === 0 ? (
              <>
                <h1 className="my-2">No Ratings Yet For You.</h1>
              </>
            ) : (
              <>
                <h1 className="my-1">
                  Total {ratings ? ratings.length : null} Ratings
                </h1>
                {ratings
                  ? ratings.map((value) => {
                      return (
                        <>
                          <SIngleRating
                            value={value}
                            render={render}
                            setRender={setRender}
                          />
                        </>
                      );
                    })
                  : null}

                <h1 style={{ fontWeight: "bold", marginLeft: "30px" }}>
                  Average Rating
                </h1>
                <div className="container mx-auto d-flex justify-content-center">
                  <ReactStars
                    count={5}
                    value={averageRating}
                    size={31}
                    color2={"#FDCC0D"}
                    style={{ margin: "0px auto" }}
                    edit={false}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MyRatings;
