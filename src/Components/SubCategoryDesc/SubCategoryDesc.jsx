import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { findSubCategoryOfItems } from "../../Helpers/generalHelpers";
import PostCard from "../PostCard/PostCard";

const SubCategoryDesc = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [subCategory, setSubCategroy] = useState([]);
  const handleClick = (name) => {
    setName(name);
  };
  useEffect(() => {
    setSubCategroy(findSubCategoryOfItems(id));
  }, []);
  useEffect(() => {
    setName(subCategory[0]);
  }, [subCategory]);

  const [postsBySubCategory, setPostsBySubCategory] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/posts/subcategory/${name}`
        );
        setPostsBySubCategory(data.msg);
        console.log(postsBySubCategory);
        console.log(name);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [name]);

  return (
    <>
      {subCategory.map((a) => {
        return (
          <Chip
            className="mt-2 ml-2    "
            label={a}
            component="a"
            variant="outlined"
            onClick={() => handleClick(a)}
            clickable
          />
        );
      })}
      <div
        className="container latestPost__card__main"
        style={{ overflowX: "hidden" }}
      >
        {postsBySubCategory.length !== 0 ? (
          <div className="row">
            {postsBySubCategory
              ? postsBySubCategory.slice(0, 8).map((value) => {
                  return (
                    <>
                      <div
                        className="col-lg-3 col-md-4 col-sm-4 col-12 p-2"
                        style={{ margin: "0px auto" }}
                      >
                        <PostCard value={value} />
                      </div>
                    </>
                  );
                })
              : null}
          </div>
        ) : (
          <>
            <h3 className="mt-4 font-semibold text-xl">
              There are no such items related to {name}{" "}
            </h3>
          </>
        )}
      </div>
    </>
  );
};

export default SubCategoryDesc;
