import React, { useContext, useState } from "react";
import ReactStars from "react-stars";
import { UserContext } from "../../Context/User";
import { useEffect } from "react";
import { apiRequestHelper } from "../../Helpers/ApiHelpers";
import { calculateAverageValueForList } from "../../Helpers/generalHelpers";
import SuccessMessage from "../../Common/SuccessMessage";
import ErrorMessage from "../../Common/ErrorMessage";

const UserRating = ({ user1 }) => {
  const [rating, setRating] = useState(0);
  const { user } = useContext(UserContext);
  const [rated, setRated] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [render, setRender] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [error, setError] = useState(false);

  const ratingChanged = async (newRating) => {
    setRating(newRating);
    const review = newRating;
    const apiRequest = await apiRequestHelper(`rate`, "post", {
      from: user ? user._id : null,
      to: user1 ? user1._id : null,
      value: review,
    });
    apiRequest.isError ? setError(true) : setRated(true);

    setRender(!render);
  };

  const handleClose = () => {
    setRated(false);
    setError(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await apiRequestHelper(
        `rate/${user1 ? user1._id : null}`
      );
      setRatings(data);
    };
    fetchData();
  }, [user1, render]);

  useEffect(() => {
    setAverageRating(calculateAverageValueForList(ratings));
  }, [ratings, render]);
  return (
    <>
      <SuccessMessage
        open={rated}
        handleClose={handleClose}
        message={`Successfully Rated User ${rating}`}
        showStar={true}
      />
      <ErrorMessage
        open={error}
        handleClose={handleClose}
        message={`Some Error Occured`}
      />
      <h1 className="mt-1">{ratings ? ratings.length : null} Ratings</h1>
      <h1 style={{ margin: "10px 0px" }}>Rate This User</h1>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={37}
          color2={"#FDCC0D"}
          style={{ margin: "0px auto" }}
        />
      </div>
      <h1 className="mt-4">
        Average Ratings For This {user1 ? user1.name : null}
      </h1>
      <div className="container d-flex justify-content-center">
        <ReactStars
          count={5}
          value={averageRating}
          size={20}
          color2={"#FDCC0D"}
          style={{ margin: "0px auto" }}
          edit={false}
        />
      </div>
    </>
  );
};

export default UserRating;
