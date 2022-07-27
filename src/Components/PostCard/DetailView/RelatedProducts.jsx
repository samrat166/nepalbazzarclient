import { CircularProgress, Skeleton } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const RelatedProducts = ({ item, setFetch, fetch }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);

  const id = item.userId ? item.userId._id : null;

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/post/oneuser/${id ? id : null}`
        );
        setItems(data.msg);
        setLoading(false);
      } catch (error) {
        setRender(!render);
        console.log(error.response.data);
        setLoading(false);
      }
    };
    fetchItem();
  }, [render]);

  return (
    <>
      <h2 className="text-sm text-2xl title-font text-gray-500 tracking-widest mb-1">
        Related Products
      </h2>
      {loading ? (
        <CircularProgress
          style={{
            color: "black",
            display: "flex",
            justifyContent: "center",
            margin: "0px auto",
          }}
        />
      ) : (
        <>
          {items
            ? items.map((value) => {
                return (
                  <>
                    {value._id !== item._id && (
                      <div
                        className="mt-2"
                        style={{
                          border: "1px solid lightgray",
                          borderRadius: "10px",
                        }}
                      >
                        <div className="flex relative">
                          <img
                            alt="gallery"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            src={value ? value.pic1 : null}
                            style={{ borderRadius: "10px" }}
                          />
                          <div
                            className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100"
                            style={{ borderRadius: "10px" }}
                          >
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-1">
                              {value ? value.productName : null}
                            </h1>
                            <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                              {value ? value.productCategory : null}
                            </h2>

                            <p className="leading-relaxed">
                              Rs.{value ? value.price : null}
                            </p>
                            <Link
                              to={`/detail/view/${value ? value._id : null}`}
                              style={{
                                marginTop: "20px",
                                color: "blue",
                              }}
                              onClick={() => setFetch(!fetch)}
                            >
                              <p className="leading-relaxed mt-1 text-blue">
                                View This Product
                              </p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              })
            : null}
        </>
      )}
    </>
  );
};

export default RelatedProducts;
