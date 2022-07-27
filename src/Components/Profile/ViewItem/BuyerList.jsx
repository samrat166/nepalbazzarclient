import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleBuyerList from "./SingleBuyerList";

const BuyerList = ({ item, user }) => {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sold, setSold] = useState(false);
  const [render, setRender] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/sold/item/${item ? item._id : null}`
        );
        console.log(data);
        setInfo(data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [render]);
  useEffect(() => {
    const filteredValue = info.find((value) => {
      return value.sold === true;
    });
    if (filteredValue) {
      setSold(true);
    } else {
      setSold(false);
    }
  });
  console.log(sold);

  return (
    <>
      {loading ? (
        <CircularProgress style={{ color: "black", margin: "0px auto" }} />
      ) : (
        <>
          {info ? (
            info.length === 0 ? (
              <h1 style={{ fontSize: "24px", margin: "15px 0px 0px 0px" }}>
                No Buying Order Yet.
              </h1>
            ) : (
              <>
                <h1 style={{ fontSize: "24px", margin: "15px 0px 0px 0px" }}>
                  All Buying Order({info ? info.length : null})
                </h1>

                <>
                  <section className="text-gray-600 body-font w-full">
                    <div className="container  py-5 mx-auto w-full">
                      <div className="flex flex-wrap -m-2 w-full">
                        {info
                          ? info.map((value) => {
                              return (
                                <>
                                  <div className="p-2 lg:w-1/2 md:w-1/2 w-full my-4">
                                    <SingleBuyerList
                                      value={value}
                                      sold={sold}
                                      render={render}
                                      setRender={setRender}
                                      user={user}
                                    />
                                  </div>
                                </>
                              );
                            })
                          : null}
                      </div>
                    </div>
                  </section>
                </>
              </>
            )
          ) : null}
        </>
      )}
    </>
  );
};

export default BuyerList;
