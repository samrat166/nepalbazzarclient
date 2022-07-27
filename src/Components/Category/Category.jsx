import React, { useState } from "react";
import "./Category.css";
import { Spin as Hamburger } from "hamburger-react";

import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import PowerIcon from "@mui/icons-material/Power";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import RoofingIcon from "@mui/icons-material/Roofing";
import PianoIcon from "@mui/icons-material/Piano";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import Data from "./List.json";
import { CategoryName } from "../../Helpers/generalHelpers";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Category = () => {
  const [isOpen, setOpen] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState([
    <SportsMotorsportsIcon fontSize="small" className="mb-1" />,
    <PowerIcon fontSize="small" className="mb-1" />,
    <KeyboardIcon fontSize="small" className="mb-1" />,
    <MedicationLiquidIcon fontSize="small" className="mb-1" />,
    <HeadsetMicIcon fontSize="small" className="mb-1" />,
    <SportsVolleyballIcon fontSize="small" className="mb-1" />,
    <SportsEsportsIcon fontSize="small" className="mb-1" />,
    <RoofingIcon fontSize="small" className="mb-1" />,
    <PianoIcon fontSize="small" className="mb-1" />,
    <AgricultureIcon fontSize="small" className="mb-1" />,
  ]);

  return (
    <>
      <div className="category__main">
        <Hamburger
          className="dropdown__category"
          toggled={isOpen}
          toggle={setOpen}
          size={20}
        />
        <p style={{ color: "#212529" }} className="p-2 mt-1  font-normal">
          All Category
        </p>
      </div>
      {isOpen && (
        <>
          <div className="category__body">
            <ul className="list__items">
              {Data.map((a, index) => {
                return (
                  <Link
                    to={`/category/${a.id}`}
                    className="hover:text-yellow-600 "
                  >
                    <li className="list__item">
                      {categoryIcon[index]} {a.category}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Category;
