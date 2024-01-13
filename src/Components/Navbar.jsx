import React from "react";
import { Link } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiHotMeal } from "react-icons/gi";
import { SiGoogleanalytics } from "react-icons/si";

const Navbar = () => {
  return (
    <div className="w-full h-full max-w-[250px] fixed left-0 top-0 bottom-0 bg-blue-500 text-white">
      <Link to="/">
        <div className="text-2xl font-bold text-center p-7">
          <p>Nutritionist</p>
          <p>Dashboard</p>
        </div>
      </Link>
      <div className="p-4 flex flex-col justify-between items-center gap-10 pt-[90px] text-[20px]">
        <Link to="/">
          <div className="flex justify-between items-center gap-4 hover:shadow-md hover:bg-white hover:text-black hover:shadow-gray-400 hover:rounded-md px-12 py-4 duration-300">
            <BsFillPeopleFill />
            <p>Clients</p>
          </div>
        </Link>
        <Link to="/meals">
          <div className="flex justify-between items-center gap-4 hover:shadow-md hover:bg-white hover:text-black hover:shadow-gray-400 hover:rounded-md px-12 py-4 duration-300">
            <GiHotMeal />
            <p>Meals</p>
          </div>
        </Link>
        <Link to="/analytics">
          <div className="flex justify-between items-center gap-4 hover:shadow-md hover:bg-white hover:text-black hover:shadow-gray-400 hover:rounded-md px-12 py-4 duration-300">
            <SiGoogleanalytics />
            <p>Analytics</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
