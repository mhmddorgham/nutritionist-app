import React, { useEffect, useState } from "react";
import { GiMeal } from "react-icons/gi";
import axios from "axios";
import { BiCategory } from "react-icons/bi";
import { AiOutlineFire } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import MoreThanAvg from "./MoreThanAvg";
import LessThanAvg from "./LessThanAvg";
import IngrdAvgCal from "./ingrdAvgCal";

const Meals = () => {
  const [mostconsumedmeal, setmMstconsumedmeal] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:3001/mostconsumedmeal";
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        setError("");
        setmMstconsumedmeal(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [url]);
  console.log(mostconsumedmeal);
  return (
    <div className="w-[100% - 250px] h-full ml-[250px] py-7 px-10 bg-[#F4F4F4] ">
      <div className="w-full py-7">
        <p className="text-3xl py-3 font-bold">Most Consumed Meal</p>
        <p className=" text-gray-500 text-[20px]">
          Find more about its calorie, category, number of people consumed
        </p>
        {error ? <p className="p-4 text-red-600 font-bold">{error}</p> : null}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="rounded-full border-4 border-gray-200 h-12 w-12 animate-spin"></div>
          </div>
        ) : null}
      </div>
      {mostconsumedmeal &&
        mostconsumedmeal.map((meal) => {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-5 gap-10">
              <div className="p-5 shadow-md shadow-gray-300 rounded-xl bg-white">
                <GiMeal className="text-5xl" />
                <p className="text-gray-500 p-2 text-[21px]">
                  Most consumed Meal
                </p>
                <div className="flex items-start gap-3 text-[25px]">
                  <p className="font-bold ">{meal.meal_name}</p>
                </div>
              </div>
              <div className="p-5 shadow-md shadow-gray-300 rounded-xl bg-white">
                <AiOutlineFire className="text-5xl" />
                <p className="text-gray-500 p-2 text-[22px]">
                  Number of Calories
                </p>
                <div className="flex items-start gap-3 text-[25px]">
                  <p className="font-bold ">{meal.meal_calories}</p>
                  <p className="font-bold ">Kcal</p>
                </div>
              </div>
              <div className="p-5 shadow-md shadow-gray-300 rounded-xl bg-white">
                <BiCategory className="text-5xl" />
                <p className="text-gray-500 p-2 text-[22px]">Category</p>
                <div className="flex items-start gap-3 text-[25px]">
                  <p className="font-bold ">Protien</p>
                  <p className="font-bold ">Food</p>
                </div>
              </div>
              <div className="p-5 shadow-md shadow-gray-300 rounded-xl bg-white">
                <BsPeople className="text-5xl" />
                <p className="text-gray-500 p-2 text-[23px]">
                  Number of people Consumed
                </p>
                <div className="flex items-start gap-3 text-[25px]">
                  <p className="font-bold ">{meal.people_num}</p>
                  <p className="font-bold ">People</p>
                </div>
              </div>
            </div>
          );
        })}

      <MoreThanAvg />
      <LessThanAvg />
      <IngrdAvgCal />
    </div>
  );
};

export default Meals;
