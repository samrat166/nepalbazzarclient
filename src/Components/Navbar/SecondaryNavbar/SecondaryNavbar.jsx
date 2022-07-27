import React from "react";
import { Link } from "react-router-dom";

export const SecondaryNavbar = () => {
  return (
    <>
      <nav
        style={{
          display: "flex",
          backgroundColor: "#e0dcdc",
          height: "25px",
          justifyContent: "right",
          top: "0",
          zIndex: "201",
        }}
        className="container-fluid navbar navbar-expand-lg navbar-light "
      >
        <div className="">
          <Link to="/pages/helpcenter">
            <h1
              style={{
                fontSize: "15px",
                color: "#2e1a75",
                marginRight: "8px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Help Center
            </h1>
          </Link>
        </div>
        <div className="">
          <Link to="/pages/privacypolicy">
            <h1
              style={{
                fontSize: "15px",
                color: "#2e1a75",
                marginRight: "8px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Privacy Policy
            </h1>
          </Link>
        </div>
        <div className="">
          <Link to="/contact-us">
            <h1
              style={{
                fontSize: "15px",
                color: "#2e1a75",
                marginRight: "8px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Contact us
            </h1>
          </Link>
        </div>
        <div className="">
          <Link to="/pages/FAQs">
            <h1
              style={{
                fontSize: "15px",
                color: "#2e1a75",
                marginRight: "8px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              FAQs
            </h1>
          </Link>
        </div>
      </nav>
    </>
  );
};
