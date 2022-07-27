import React from "react";
import { Link } from "react-router-dom";

const PostsByLocation = ({ location, image, province, city }) => {
  return (
    <div className="lg:w-1/4  sm:w-1/2 md:w-1/2 p-1">
      <div className="flex relative">
        <img
          alt="gallery"
          className="absolute inset-0 w-full  object-cover object-center"
          src={image}
        />
        <div className=" px-8 py-5 relative  w-full border-1 border-gray-200 bg-white opacity-0 hover:opacity-75">
          <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
            {province}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {city}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PostsByLocation;
