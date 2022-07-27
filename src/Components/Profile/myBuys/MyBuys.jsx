import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../Context/User";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const MyBuys = () => {
  const [buys, setBuys] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/sold/buyer/${user ? user._id : null}`
      );
      console.log(data);
      setBuys(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <CircularProgress style={{ color: "black", marginTop: "10px" }} />
        </>
      ) : (
        <>
          {buys
            ? buys.length === 0 && (
                <h1 style={{ fontSize: "20px", margin: "20px 0px" }}>
                  You Have Not Bought Any Items Yet.
                </h1>
              )
            : null}
          <section className="mt-4">
            {buys
              ? buys.map((value) => {
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

export default MyBuys;
