import { Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../PostCard";

const LatestPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/posts/all"
        );
        setPosts(data.msg);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return (
    <>
      <div
        className="container latestPost__card__main"
        style={{ overflowX: "hidden" }}
      >
        <div className="row">
          {loading ? (
            <>
              {posts
                ? posts.slice(0, 12).map((value) => {
                    return (
                      <>
                        <div
                          className="col-lg-2 col-md-3 col-sm-4 col-12 p-2"
                          style={{ margin: "0px auto" }}
                        >
                          <Skeleton
                            variant="rectangular"
                            style={{
                              height: "440px",
                              borderRadius: "10px",
                              width: "100%",
                            }}
                          />
                        </div>
                      </>
                    );
                  })
                : null}

              {/* <div className="container mt-6">
                <div className="row">
                  <div className="col" style={{ margin: "0px auto" }}>
                    <Skeleton
                      variant="rectangular"
                      style={{
                        height: "440px",
                        borderRadius: "10px",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
              </div> */}
            </>
          ) : (
            <>
              {posts
                ? posts.slice(0, 12).map((value) => {
                    return (
                      <>
                        <div
                          className="col-lg-2 col-md-3 col-sm-4 col-12 p-2"
                          style={{ margin: "0px auto" }}
                        >
                          <PostCard value={value} />
                        </div>
                      </>
                    );
                  })
                : null}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LatestPost;
