import {
  Alert,
  CircularProgress,
  Skeleton,
  Snackbar,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../Context/User";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteLiked from "./DeleteLiked";

const Liked = () => {
  const [liked, setLiked] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/user/like/${user ? user._id : null}`
        );
        console.log(data);
        setLiked(data.msg);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.msg);
        setLoading(false);
      }
    };
    fetchLikes();
  }, [render]);

  const handleClose = () => {
    setDeleted(false);
  };

  var current = new Date();
  console.log(current);

  return (
    <>
      <Snackbar open={deleted} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Successfully Deleted Your Liked Item.
        </Alert>
      </Snackbar>
      {loading ? (
        <>
          <CircularProgress style={{ color: "black", marginTop: "10px" }} />
        </>
      ) : (
        <>
          {liked
            ? liked.length === 0 && (
                <h1 style={{ fontSize: "20px", margin: "20px 0px" }}>
                  No Liked Items Yet.
                </h1>
              )
            : null}
          <section className="mt-4">
            {liked
              ? liked.map((value) => {
                  return (
                    <>
                      <div className=" flex flex-col items-center   ">
                        <div className="flex flex-col items-center pb-10 mx-auto my-2  sm:flex-row">
                          <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 text-neutral-600 ">
                            <img
                              src={
                                value.productId ? value.productId.pic1 : null
                              }
                              alt=""
                              srcset=""
                            />
                          </div>
                          <div className="w-full   prose text-center sm:text-left sm:mt-0 prose-md">
                            <h2>
                              {value.productId
                                ? value.productId.productName
                                : null}
                            </h2>
                            <p>
                              {value.productId
                                ? value.productId.productDescription
                                : null}
                            </p>
                          </div>

                          <DeleteLiked
                            value={value}
                            render={render}
                            setRender={setRender}
                            deleted={deleted}
                            setDeleted={setDeleted}
                          />
                        </div>
                        <div className="container cursor-pointer">
                          <Link
                            to={`/detail/view/${
                              value.productId ? value.productId._id : null
                            }`}
                          >
                            <ArrowForwardIosIcon
                              className="cursor-pointer"
                              style={{
                                width: "16px",
                                height: "16px",
                              }}
                            />{" "}
                            View More
                          </Link>
                          <hr className="mt-2 w-full" />
                        </div>
                      </div>
                    </>
                  );
                })
              : null}
          </section>
        </>
      )}
    </>
  );
};

export default Liked;
