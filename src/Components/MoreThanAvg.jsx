import React, { useState, useEffect } from "react";
import axios from "axios";

const MoreThanAvg = () => {
  const [morethanavg, setMorethanavg] = useState([]);
  const [error, setError] = useState("");

  const url = "http://localhost:3001/morethanavg";
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setError("");
        setMorethanavg(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  });
  return (
    <div>
      <div className="w-full py-5">
        {error ? <p className="p-4 text-red-600 font-bold">{error}</p> : null}
      </div>

      <div className="">
        <p className="text-4xl p-7">Meals calories more than average</p>

        <table className="w-full border-collapse text-center bg-[white] shadow-lg rounded-lg shadow-gray-300 text-[17px] ">
          <thead className="p-9">
            <tr className="border-b text-gray-500 p-9">
              <th className="p-6">Meal #</th>
              <th>Meal Name</th>
              <th>Meal Type</th>
              <th>Meal Calories</th>
              <th>client #</th>
            </tr>
          </thead>
          <tbody>
            {morethanavg &&
              morethanavg.map((meal, i) => {
                return (
                  <tr key={i}>
                    <td className="p-7">{meal.meal_id}</td>
                    <td>{meal.meal_name}</td>
                    <td>{meal.meal_Type}</td>
                    <td>{meal.meal_calories}</td>
                    <td>{meal.client_id}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoreThanAvg;
