import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { BsPeople } from "react-icons/bs";
const Analytics = () => {
  const [highestconsumption, setHighestconsumption] = useState([]);
  const [youngest, setYoungest] = useState([]);
  const [oldest, setOldest] = useState([]);
  const [genderavg, setGenderavg] = useState([]);
  const [clientnummealaboveavg, setClientnummealaboveavg] = useState([]);
  const [ingrdobeseused, setIngrdobeseused] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  console.log(highestconsumption);
  console.log(oldest);
  console.log(youngest);
  // Hieghest consumption
  const url = "http://localhost:3001/highestconsumption";
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setError("");
        setLoading(false);
        setHighestconsumption(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [url]);

  const youngestURL = "http://localhost:3001/youngest";
  useEffect(() => {
    axios.get(youngestURL).then((res) => {
      setYoungest(res.data);
    });
  }, [youngestURL]);

  const oldestURL = "http://localhost:3001/oldest";
  useEffect(() => {
    axios.get(oldestURL).then((res) => {
      setOldest(res.data);
    });
  }, [oldestURL]);

  const genderavgURL = "http://localhost:3001/genderavg";
  useEffect(() => {
    axios.get(genderavgURL).then((res) => {
      setGenderavg(res.data);
    });
  }, [genderavgURL]);

  const clientnummealaboveavgURL =
    "http://localhost:3001/clientnummealaboveavg";
  useEffect(() => {
    axios.get(clientnummealaboveavgURL).then((res) => {
      setClientnummealaboveavg(res.data);
    });
  }, [clientnummealaboveavgURL]);

  const ingrdobeseusedURL = "http://localhost:3001/ingrdobeseused";
  useEffect(() => {
    axios.get(ingrdobeseusedURL).then((res) => {
      setIngrdobeseused(res.data);
    });
  }, [ingrdobeseusedURL]);

  const getCurrentAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const now = new Date();
    const diffInMilliseconds = Math.abs(now - birthDate);
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
    const age = Math.floor(diffInMilliseconds / millisecondsInYear);
    return age;
  };

  return (
    <div className="w-[100% - 250px] h-full ml-[250px] py-7 px-10 bg-[#F4F4F4] ">
      <div className="w-full py-7">
        <p className="text-3xl py-3 font-bold">Analytics</p>
        <p className=" text-gray-500 text-[20px]">
          Find more about your clients and meals
        </p>
        {error ? <p className="p-4 text-red-600 font-bold">{error}</p> : null}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="rounded-full border-4 border-gray-200 h-12 w-12 animate-spin"></div>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-5 gap-10">
        {youngest &&
          youngest.map((young) => {
            return (
              <div className="p-5 shadow-md shadow-gray-300 rounded-xl bg-white">
                {young.sex === "Male" ? (
                  <div className="text-5xl">
                    <FcBusinessman />
                  </div>
                ) : (
                  <div className="text-5xl">
                    <FcBusinesswoman />
                  </div>
                )}
                <p className="text-gray-500 py-3 text-[20px]">
                  youngest Client
                </p>
                <div className="flex items-start flex-col gap-3 text-[25px]">
                  <p className="font-bold ">{young.client_name}</p>
                  <p className="font-bold text-green-500 ">
                    {getCurrentAge(young.DOB)} years old
                  </p>
                </div>
              </div>
            );
          })}

        {oldest &&
          oldest.map((old) => {
            return (
              <div className="p-5 shadow-md shadow-gray-300 rounded-xl bg-white">
                {old.sex === "Male" ? (
                  <div className="text-5xl">
                    <FcBusinessman />
                  </div>
                ) : (
                  <div className="text-5xl">
                    <FcBusinesswoman />
                  </div>
                )}
                <p className="text-gray-500 py-3 text-[20px]">Oldest Client</p>
                <div className="flex items-start flex-col gap-3 text-[25px]">
                  <p className="font-bold ">{old.client_name}</p>
                  <p className="font-bold text-red-500 ">
                    {getCurrentAge(old.DOB)} years old
                  </p>
                </div>
              </div>
            );
          })}

        {highestconsumption &&
          highestconsumption.map((meal) => {
            return (
              <div className="p-5 shadow-md shadow-gray-300 rounded-xl bg-white">
                <FcBusinesswoman className="text-5xl" />
                <p className="text-gray-500 py-3 text-[20px]">
                  Hieghest Consumption
                </p>
                <div className="flex items-start flex-col gap-3 text-[25px]">
                  <p className="font-bold ">{meal.client_name}</p>
                  <p className="font-bold text-yellow-500">
                    {meal.meal_calories} Kcal
                  </p>
                </div>
              </div>
            );
          })}
        {clientnummealaboveavg &&
          clientnummealaboveavg.map((client) => {
            return (
              <div className="p-5 shadow-md shadow-gray-300 rounded-xl bg-white">
                <BsPeople className="text-5xl" />
                <p className="text-gray-500 py-3 text-[17px]">
                  Clients consumed Meals its calorie is higher than average
                </p>
                <div className="flex items-start flex-col gap-3 text-[25px]">
                  <p className="font-bold ">{client.clientnum}</p>
                </div>
              </div>
            );
          })}
        {genderavg &&
          genderavg.map((person) => {
            return (
              <div className="p-5 shadow-md shadow-gray-300 rounded-xl bg-white">
                {person.sex === "Male" ? (
                  <FcBusinessman className="text-5xl" />
                ) : (
                  <FcBusinesswoman className="text-5xl" />
                )}
                {person.sex === "Male" ? (
                  <p className="text-gray-500 py-3 text-[20px]">
                    Average Male Calories
                  </p>
                ) : (
                  <p className="text-gray-500 py-3 text-[20px]">
                    Average Female Calories
                  </p>
                )}
                <div className="flex items-start flex-col gap-3 text-[25px]">
                  <p className="font-bold text-yellow-500 ">
                    {person.calavg.toFixed(1)} Kcal
                  </p>
                </div>
              </div>
            );
          })}
      </div>

      <div className="">
        <p className="text-4xl p-7">
          Ingredient which is used mostly in a specific week for obese clients
        </p>

        <table className="w-full border-collapse text-center bg-[white] shadow-lg rounded-lg shadow-gray-300 text-[17px] ">
          <thead className="p-9">
            <tr className="border-b text-gray-500 p-9">
              <th className="p-6">Ingredient Name</th>
              <th>Ingredient Category</th>
              <th>Ingredient quantity</th>
            </tr>
          </thead>
          <tbody>
            {ingrdobeseused &&
              ingrdobeseused.map((ingrd) => {
                return (
                  <tr>
                    <td className="p-7">{ingrd.ingredients_name}</td>
                    <td>{ingrd.ingredients_category}</td>
                    <td>{ingrd.quantity}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
