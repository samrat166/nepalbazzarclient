import React, { useEffect, useState, useContext } from "react";
import "./AddAPost.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Steps1 from "./Steps/Steps1";
import Steps2 from "./Steps/Steps2";
import Steps3 from "./Steps/Steps3";
import { Alert, Fab, Snackbar, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Donw from "./Steps/Donw";
import { UserContext } from "../../Context/User";
import NoAuth from "../NoAuth/NoAuth";
const steps = ["Step 1", "Step 2", "Step 3"];

const AddAPost = () => {
  const [currState, setCurrStep] = useState(0);
  const [currComp, setCurrComp] = useState(0);
  const { error } = useContext(UserContext);
  const [productName, setproductName] = useState("");
  const [productCategory, setproductCategory] = useState("");
  const [productSubCategory, setproductSubCategory] = useState("");
  const [productBrand, setproductBrand] = useState("");
  const [productDescription, setproductDescription] = useState("");
  const [err1, setErr1] = useState(false);
  const [err2, setErr2] = useState(false);
  const [err3, setErr3] = useState(false);
  const [pic1, setpic1] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16s0oBAZeWoNoU8gAp7AQMbX964nW1Ea4D56fiET_PMC1lACqY8RcRNqgYfq3xcKQWaM&usqp=CAU"
  );
  const [pic2, setpic2] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16s0oBAZeWoNoU8gAp7AQMbX964nW1Ea4D56fiET_PMC1lACqY8RcRNqgYfq3xcKQWaM&usqp=CAU"
  );
  const [pic3, setpic3] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16s0oBAZeWoNoU8gAp7AQMbX964nW1Ea4D56fiET_PMC1lACqY8RcRNqgYfq3xcKQWaM&usqp=CAU"
  );
  const [location, setlocation] = useState("");
  const [state, setstate] = useState("");
  const [price, setprice] = useState("");
  const [negotiable, setnegotiable] = useState(false);
  useEffect(() => {
    if (currState === 0) {
      setCurrComp(0);
    } else if (currState === 1) {
      setCurrComp(1);
    } else {
      setCurrComp(2);
    }
  }, []);

  const handleIncr = () => {
    if (currComp === 0) {
      if (
        productName === "" ||
        productCategory === "" ||
        productSubCategory === "" ||
        productDescription === ""
      ) {
        setErr1(true);
        window.scrollTo(0, 0);
      } else {
        setCurrStep(currState + 1);
        setCurrComp(currComp + 1);
        setErr1(false);
      }
    } else if (currComp === 1) {
      if (
        pic1 ===
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16s0oBAZeWoNoU8gAp7AQMbX964nW1Ea4D56fiET_PMC1lACqY8RcRNqgYfq3xcKQWaM&usqp=CAU"
      ) {
        setErr2(true);
        window.scrollTo(0, 0);
      } else {
        setCurrStep(currState + 1);
        setCurrComp(currComp + 1);
        setErr2(false);
      }
    } else if (currComp === 2) {
      if (location === "" || state === "" || price === "") {
        setErr3(true);
        window.scrollTo(0, 0);
      } else {
        setCurrStep(currState + 1);
        setCurrComp(currComp + 1);
        setErr3(false);
      }
    }
  };

  const handleDecr = () => {
    setCurrStep(currState - 1);
    setCurrComp(currComp - 1);
    setErr1(false);
    setErr2(false);
    setErr3(false);
  };

  const handleClose = () => {
    setErr1(false);
    setErr2(false);
    setErr3(false);
  };
  return (
    <>
      <Snackbar open={err1} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Fields Should Not Be Empty.
        </Alert>
      </Snackbar>
      <Snackbar open={err2} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Please Choose Atleast One Image.
        </Alert>
      </Snackbar>
      <Snackbar open={err3} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Fields Should Not Be Empty.
        </Alert>
      </Snackbar>
      {error === "" ? (
        <div className="container add__a__post__div__main mb-20">
          <h1 style={{ color: "black", fontSize: "20px" }} className="pt-3">
            Please Fill Out These Information
          </h1>

          <Stepper
            activeStep={currState}
            alternativeLabel
            style={{ marginTop: "30px" }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currComp === 0 && (
            <Steps1
              productName={productName}
              setproductName={setproductName}
              productCategory={productCategory}
              setproductCategory={setproductCategory}
              productSubCategory={productSubCategory}
              setproductSubCategory={setproductSubCategory}
              productDescription={productDescription}
              setproductDescription={setproductDescription}
              productBrand={productBrand}
              setproductBrand={setproductBrand}
            />
          )}
          {currComp === 1 && (
            <Steps2
              pic1={pic1}
              setpic1={setpic1}
              pic2={pic2}
              setpic2={setpic2}
              pic3={pic3}
              setpic3={setpic3}
            />
          )}
          {currComp === 2 && (
            <Steps3
              location={location}
              setlocation={setlocation}
              state={state}
              setstate={setstate}
              price={price}
              setprice={setprice}
              negotiable={negotiable}
              setnegotiable={setnegotiable}
            />
          )}
          {currComp > 2 && (
            <Donw
              productName={productName}
              setproductName={setproductName}
              productCategory={productCategory}
              setproductCategory={setproductCategory}
              productSubCategory={productSubCategory}
              setproductSubCategory={setproductSubCategory}
              productDescription={productDescription}
              setproductDescription={setproductDescription}
              productBrand={productBrand}
              setproductBrand={setproductBrand}
              pic1={pic1}
              setpic1={setpic1}
              pic2={pic2}
              setpic2={setpic2}
              pic3={pic3}
              setpic3={setpic3}
              location={location}
              setlocation={setlocation}
              state={state}
              setstate={setstate}
              price={price}
              setprice={setprice}
              negotiable={negotiable}
              setnegotiable={setnegotiable}
            />
          )}
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10vh 0px",
            }}
          >
            {currState !== 0 && currState <= 3 ? (
              <Tooltip title="Previous Step">
                <Fab
                  color="primary"
                  aria-label="add"
                  className="arrow__button__main"
                  onClick={handleDecr}
                  style={{ marginButton: "30px" }}
                >
                  <ArrowBackIcon />
                </Fab>
              </Tooltip>
            ) : (
              <Fab
                aria-label="add"
                className="arrow__button__main"
                disabled={true}
                onClick={() => {
                  setCurrStep(currState - 1);
                  setCurrComp(currComp - 1);
                }}
                style={{
                  color: "white",
                  backgroundColor: "white",
                  boxShadow: "none",
                }}
              ></Fab>
            )}
            {currState < 3 && (
              <>
                <Tooltip title="Next Step">
                  <Fab
                    color="primary"
                    aria-label="add"
                    className="arrow__button__main"
                    onClick={handleIncr}
                    style={{ marginButton: "30px" }}
                  >
                    <ArrowForwardIcon />
                  </Fab>
                </Tooltip>
              </>
            )}
          </div>
        </div>
      ) : (
        <NoAuth />
      )}
    </>
  );
};

export default AddAPost;
