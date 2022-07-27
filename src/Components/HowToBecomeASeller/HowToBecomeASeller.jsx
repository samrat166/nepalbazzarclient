import React, { useState } from "react";
import "./HowToBecomeASeller.css";
import CreateAccount from "../../Assets/Icons/create__account.gif";
import Add__Post from "../../Assets/Icons/Add__post.gif";
import Deal from "../../Assets/Icons/deal.gif";
import ship from "../../Assets/Icons/ship.gif";
import cash from "../../Assets/Icons/cash.gif";
import TypeWriterEffect from "../Common/TypeWriterEffect";
import StepsToBecomeASeller from "../Common/StepsToBecomeASeller";

const HowToBecomeASeller = () => {
  const [stepsToBeASeller, setStepsToBeASeller] = useState([
    {
      id: 1,
      icon: CreateAccount,
      title: "Create an Account",
      description:
        "Creating an Account is easy you just have to press Register and follow all the steps",
    },
    {
      id: 2,
      icon: Add__Post,
      title: "Add a Post",
      description: "Adding Post is Just filling up the form with some data",
    },
    {
      id: 3,
      icon: Deal,
      title: "Make a Good Deal",
      description: " You should make a good deal with your client Shippment",
    },
    {
      id: 4,
      icon: ship,
      title: "Shippment",
      description:
        "It is your responsibility to ship your goods to the client's location",
    },
    {
      id: 5,
      icon: cash,
      title: "Cash",
      description: "In return you will get cash.Enjoy!",
    },
  ]);
  return (
    <>
      <div className="mt-5 text-center w-full ">
        <TypeWriterEffect
          staticTitle={"How to Become a"}
          dynamicTitle={"Seller"}
        />
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          {stepsToBeASeller.map(({ id, icon, title, description }) => {
            return (
              <StepsToBecomeASeller
                id={id}
                icon={icon}
                title={title}
                description={description}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default HowToBecomeASeller;
