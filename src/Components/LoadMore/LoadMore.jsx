import { CircularProgress, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./LoadMore.css";
import SortIcon from "@mui/icons-material/Sort";
import axios from "axios";
import PostCard from "../PostCard/PostCard";

const LoadMore = () => {
  const [data1, setData1] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (search === "") {
        setError("");
        setLoading(true);
        try {
          const { data } = await axios.get(
            "http://localhost:4000/api/v1/posts/all"
          );
          setData1(data.msg);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [fetch]);

  const keyPress = async () => {
    if (search !== "") {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/find/regex/${search}`
        );
        console.log(data);
        if (data.length === 0) {
          setError(`No Result Found For "${search}"`);
        } else if (data.length !== 0) {
          setError("");
        }
        setData1(data);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setError("");
      setFetch(!fetch);
    }
  };

  return (
    <div>
      {" "}
      <div className="container mt-4 main__col__search">
        <div className="row">
          <div className="col-10 " style={{ margin: "0px auto" }}>
            <input
              type="search"
              id="form1"
              className="form-control search__control"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={keyPress}
            />
          </div>
          <div
            className="col-2 "
            style={{ cursor: "pointer", margin: "0px auto" }}
            onClick={() => setShowDrop(!showDrop)}
          >
            <div>
              <Tooltip title="Filter Products">
                <SortIcon className="sort__icon" />
              </Tooltip>
              {showDrop ? (
                <div
                  x-show="open"
                  className="absolute right-0 z-30 mr-1 mt-2 origin-top-right rounded-md shadow-sm md:w-48 dropdown__main__class"
                >
                  <div className="px-2 py-2 bg-white rounded-md shadow dropdown__main">
                    <h4
                      //   onClick={handleLowestPrice}
                      className="block px-4
py-2
mt-2
text-sm text-gray-600
md:mt-0
hover:text-blue-600
focus:outline-none focus:shadow-outline
"
                    >
                      Lowest Price
                    </h4>
                    <h4
                      //   onClick={handleHighestPrice}
                      className="
block
px-4
py-2
mt-2
text-sm text-gray-600
md:mt-0
hover:text-blue-600
focus:outline-none focus:shadow-outline
"
                    >
                      Highest Price
                    </h4>
                    <h4
                      //   onClick={handleLowestAmount}
                      className="
block
px-4
py-2
mt-2
text-sm text-gray-600
md:mt-0
hover:text-blue-600
focus:outline-none focus:shadow-outline
"
                    >
                      Lowest Amount
                    </h4>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <CircularProgress style={{ margin: "20px 0px", color: "black" }} />
      )}
      {error && (
        <h1
          style={{
            fontSize: "25px",
            textAlign: "center",
            margin: "20px 0px",
            color: "black",
          }}
        >
          {error}
        </h1>
      )}
      <div className="container mt-4 loadmore__main">
        <div className="row">
          {data1
            ? data1.map((value) => {
                return (
                  <>
                    <div
                      className="col-md-3 col-10"
                      style={{ margin: "0px auto" }}
                    >
                      <PostCard value={value} />
                    </div>
                  </>
                );
              })
            : null}
        </div>
      </div>{" "}
    </div>
  );
};

export default LoadMore;
