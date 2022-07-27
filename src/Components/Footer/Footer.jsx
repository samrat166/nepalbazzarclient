import React from "react";
import "./Footer.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div
        style={{ textAlign: "left" }}
        className="container-fluid bg-secondary text-dark mt-5 pt-5"
      >
        <div className="row px-xl-5 pt-5">
          <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
            <a href className="text-decoration-none">
              <h1 className="mb-4 text-3xl display-5 font-weight-semi-bold">
                <b>NepalBazzar</b>
              </h1>
            </a>
            <p>
              Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum
              no sit erat lorem et magna ipsum dolore amet erat.
            </p>
            <p className="mb-2">
              <LocationOnIcon />
              Bargachhi, Biratnagar, Nepal
            </p>
            <p className="mb-2">
              <EmailIcon /> nepalbazzar@gmail.com
            </p>
            <p className="mb-0">
              <PhoneIcon /> 021-367890
            </p>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-md-4 mb-5">
                <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
                <div className="d-flex flex-column justify-content-start">
                  <Link className="text-dark mb-2" to="/">
                    Home
                  </Link>
                  <Link className="text-dark mb-2" to="/">
                    Latest Items
                  </Link>
                  <Link className="text-dark mb-2" to="/">
                    Trending Items
                  </Link>
                  <Link className="text-dark mb-2" to="/">
                    Most Viewed Items
                  </Link>

                  <a className="text-dark" href="">
                    Contact Us
                  </a>
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h5 className="font-weight-bold text-dark mb-4">Support</h5>
                <div className="d-flex flex-column justify-content-start">
                  <Link className="text-dark mb-2" to="/help-center">
                    Help Center
                  </Link>
                  <Link className="text-dark mb-2" to="/privacy-policy">
                    Privacy Policy
                  </Link>
                  <Link className="text-dark mb-2" to="/FAQs">
                    FAQs
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h5 className="font-weight-bold text-dark mb-4">Newsletter</h5>
                <form action>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control border-0 py-4"
                      placeholder="Your Name"
                      required="required"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control border-0 py-4  "
                      placeholder="Your Email"
                      required="required"
                    />
                  </div>
                  <button
                    className="btn btn-primary btn-block border-0 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
                    type="submit"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ marginBottom: "83px" }}
          className="row border-top border-light mx-xl-5 py-0   "
        >
          <div className="col-md-6 px-xl-0">
            <p className="mb-md-0 text-center text-md-left text-dark">
              ©{" "}
              <a className="text-dark font-weight-semi-bold" href="#">
                NepalBazzar
              </a>
              . All Rights Reserved. Designed by
              <a className="text-dark font-weight-semi-bold" href="">
                {" "}
                nepalbazzar
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
