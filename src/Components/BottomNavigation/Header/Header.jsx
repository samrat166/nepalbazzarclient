import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../Navbar/logo.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { SecondaryNavbar } from "../../Navbar/SecondaryNavbar/SecondaryNavbar";
const Header = () => {
  return (
    <>
      <div
        className="Header__main__nav"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F8CF4B",
          padding: "0px",
          position: "sticky",
          top: "0",
          zIndex: "20",
          height: "120px",
        }}
      >
        <Link className="link__hover" to="/">
          <img className="logo__main" src={logo} alt="" />
        </Link>
        <div
          style={{ width: "95%", backgroundColor: "white" }}
          className="flex flex-row mb-10"
        >
          <form style={{ width: "60%" }} className="d-flex mt-1 ">
            <SearchIcon className="ml-1 mt-2" />

            <input
              className="form-control me-2 form-box"
              type="search"
              placeholder="I am searching "
              aria-label="Search"
            />
          </form>
          <form style={{ width: "40%" }} className="d-flex mt-1 form-box">
            <LocationOnIcon fontSize="small" className="mt-2" />
            <input
              className="form-control me-2 form-box"
              type="search"
              placeholder="Location "
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;
