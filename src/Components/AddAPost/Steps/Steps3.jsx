import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const Steps3 = ({
  location,
  setlocation,
  state,
  setstate,
  price,
  setprice,
  setnegotiable,
  negotiable,
}) => {
  console.log(price);
  return (
    <>
      <h1 style={{ color: "black", fontSize: "18px" }} className="pt-3">
        Additional Information About Your Product
      </h1>
      <div className="container mt-4" style={{ height: "45%" }}>
        <div
          className="post__main__app"
          style={{ width: "60%", margin: "0px auto" }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-600"
              style={{ textAlign: "left" }}
            >
              {" "}
              Location{" "}
              <span
                style={{
                  color: "red",
                  fontSize: "15px",
                }}
              >
                *
              </span>{" "}
            </label>
            <div className="mt-2">
              <input
                id="Location"
                name="Location"
                type="text"
                required
                placeholder="Location"
                className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                value={location}
                onChange={(e) => setlocation(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2 mt-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-600"
              style={{ textAlign: "left" }}
            >
              {" "}
              Current State Of Product{" "}
              <span
                style={{
                  color: "red",
                  fontSize: "15px",
                }}
              >
                *
              </span>{" "}
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-transparent transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
              style={{ height: "60px" }}
              onChange={(e) => setstate(e.target.value)}
            >
              <option>Current State Of The Product</option>
              <option value="New" selected={state === "New" && true}>
                New
              </option>
              <option value="Like New" selected={state === "Like New" && true}>
                Like New
              </option>
              <option value="Used" selected={state === "Used" && true}>
                Used
              </option>
              <option value="Old" selected={state === "Old" && true}>
                Old
              </option>
            </select>
          </div>

          <div className="space-y-2 mt-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-600"
              style={{ textAlign: "left" }}
            >
              {" "}
              Product Price{" "}
              <span
                style={{
                  color: "red",
                  fontSize: "15px",
                }}
              >
                *
              </span>{" "}
            </label>
            <div className="mt-1">
              <input
                id="Price"
                name="Price"
                type="number"
                required
                placeholder="Rs. "
                className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                value={price}
                onChange={(e) => setprice(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 mt-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-600"
              style={{ textAlign: "left" }}
            >
              {" "}
              Is It Negotiable?{" "}
              <span
                style={{
                  color: "red",
                  fontSize: "15px",
                }}
              >
                *
              </span>{" "}
            </label>
            <div
              className="container"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <button
                className="button__post__main"
                onClick={() => setnegotiable(true)}
              >
                {negotiable && <ArrowForwardIcon />}
                Yes
              </button>
              <button
                className="button__post__main"
                onClick={() => setnegotiable(false)}
              >
                {negotiable === false && <ArrowForwardIcon />}
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Steps3;
