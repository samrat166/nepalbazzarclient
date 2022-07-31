import { Skeleton } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../Context/User";
import PostCard from "../PostCard/PostCard";

const SearchedResult = () => {
  const { searchedResult, searchedResultLoading } = useContext(UserContext);
  return (
    <>
      {searchedResult.length > 0 && (
        <h4>{searchedResult.length} Search Results Found.</h4>
      )}

      <div
        className="container latestPost__card__main"
        style={{ overflowX: "hidden" }}
      >
        <div className="row">
          {searchedResultLoading ? (
            <>
              {searchedResult
                ? searchedResult.slice(0, 12).map((value) => {
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
              {searchedResult
                ? searchedResult.slice(0, 12).map((value) => {
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

export default SearchedResult;
