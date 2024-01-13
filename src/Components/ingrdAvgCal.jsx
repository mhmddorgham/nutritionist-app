import React, { useState, useEffect } from "react";
import axios from "axios";

const IngrdAvgCal = () => {
  const [ingrdAvgCal, setIngrdAvgCal] = useState([]);
  const [error, setError] = useState("");

  const url = "http://localhost:3001/ingredientsavgcal";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setError("");
        setIngrdAvgCal(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [url]);

  return (
    <div>
      <div className="w-full py-5">
        {error ? <p className="p-4 text-red-600 font-bold">{error}</p> : null}
      </div>

      <div className="">
        <p className="text-4xl p-7">
          Average of calories of the foods by ingredient
        </p>

        <table className="w-full border-collapse text-center bg-[white] shadow-lg rounded-lg shadow-gray-300 text-[17px] ">
          <thead className="p-4">
            <tr className="border-b text-gray-500 p-9">
              <th className="p-6">Ingredient name</th>
              <th>Food average calories</th>
            </tr>
          </thead>
          <tbody>
            {ingrdAvgCal &&
              ingrdAvgCal.map((ingrd, index) => {
                return (
                  <tr key={index}>
                    <td className="p-5">{ingrd.ingredients_name}</td>
                    <td>{ingrd.avgcal.toFixed(1)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngrdAvgCal;
