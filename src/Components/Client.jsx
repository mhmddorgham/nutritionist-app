import React, { useState, useEffect } from "react";
import axios from "axios";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import {
  BsFillPersonLinesFill,
  BsFillPersonFill,
  BsCalculator,
} from "react-icons/bs";
import { FaBalanceScale } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const Client = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newDateOfBirth, setNewDateOfBirth] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newHeight, setNewHeight] = useState("");
  const [newContactNumber, setNewContactNumber] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdate = () => {
    setUpdateBtn(!updateBtn);
  };

  const handleDelete = (e) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        console.log("Successfully Deleted Client");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    return false;
  };

  const handleSubmit = (e) => {
    axios
      .put("http://localhost:3001/update", {
        newClientName: newClientName,
        newDateOfBirth: newDateOfBirth,
        newGender: newGender,
        newWeight: newWeight,
        newHeight: newHeight,
        newContactNumber: newContactNumber,
        clientId: id,
      })
      .then(() => {
        setError("");
        alert("Successfully Updated Values");
        setUpdateBtn(false);
        navigate(`/client/${id}`);
      })
      .catch((err) => {
        setError(err);
      });

    return false;
  };

  // api for clients
  const url = "http://localhost:3001/clients";
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setError("");
        setLoading(false);
        setClients(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [url]);
  console.log(id);

  // api for meals
  const mealURL = "http://localhost:3001/meals";
  useEffect(() => {
    axios
      .get(mealURL)
      .then((res) => {
        setError("");
        setLoading(false);
        setMeals(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [mealURL]);

  const filteredClients = clients.filter(
    (client) => parseInt(client.client_id) === parseInt(id)
  );

  const filteredMeals = meals.filter(
    (meal) => parseInt(meal.client_id) === parseInt(id)
  );

  console.log(filteredClients.length);
  const getCurrentAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const now = new Date();
    const diffInMilliseconds = Math.abs(now - birthDate);
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
    const age = Math.floor(diffInMilliseconds / millisecondsInYear);
    return age;
  };

  console.log(getCurrentAge("2003-06-24T20:00:00.000Z"));

  const formatDateTime = (dateString, timeString) => {
    const date = new Date(dateString);
    const [hours, minutes] = timeString.split(":");
    date.setHours(hours);
    date.setMinutes(minutes);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <div className="w-[100% - 250px] h-full ml-[250px] py-7 px-10 bg-[#F5F5FD] ">
      <div className="w-full py-5">
        {error ? <p className="p-4 text-red-600 font-bold">{error}</p> : null}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="rounded-full border-4 border-gray-200 h-12 w-12 animate-spin"></div>
          </div>
        ) : null}
      </div>
      {filteredClients.length > 0 ? (
        <div className="w-full h-full p-4 ">
          {filteredClients.map((client, index) => {
            return (
              <div key={index}>
                <div className="flex justify-between items-center px-5">
                  <div className="flex items-center gap-5">
                    {client.sex === "Male" ? (
                      <div className="text-[60px]">
                        <FcBusinessman />
                      </div>
                    ) : (
                      <div className="text-[60px]">
                        <FcBusinesswoman />
                      </div>
                    )}
                    <div>
                      <p className="text-3xl">{client.client_name}</p>
                      <p className="text-gray-500 text-2xl">
                        ID: #{client.client_id}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={handleUpdate}
                        className="p-3 bg-yellow-500 text-white rounded-lg "
                      >
                        Update Client
                      </button>
                      <button
                        onClick={handleDelete}
                        className="p-3 bg-red-500 text-white rounded-lg "
                      >
                        Delete Client
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-5 gap-10">
                  <div className="p-10 shadow-md shadow-gray-300 rounded-xl bg-white">
                    <BsCalculator className="text-5xl" />
                    <p className="text-gray-500 p-2 text-[23px]">BMI</p>
                    <div className="flex items-start gap-3 text-[25px]">
                      <p className="font-bold ">{client.bmi.toFixed(1)}</p>
                      {client.bmi >= 18.5 && client.bmi <= 25 ? (
                        <p className="font-bold text-green-500">
                          {client.body_type}
                        </p>
                      ) : (
                        <p className="font-bold text-red-500">
                          {client.body_type}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="p-10 shadow-md shadow-gray-300 rounded-xl bg-white">
                    <FaBalanceScale className="text-5xl" />
                    <p className="text-gray-500 p-2 text-[23px]">Weight</p>
                    <div className="flex items-start gap-3 text-[25px]">
                      <p className="font-bold ">{client.weight}</p>
                      <p className="font-bold ">Kg</p>
                    </div>
                  </div>
                  <div className="p-10 shadow-md shadow-gray-300 rounded-xl bg-white">
                    <BsFillPersonFill className="text-5xl" />
                    <p className="text-gray-500 p-2 text-[23px]">Height</p>
                    <div className="flex items-start gap-3 text-[25px]">
                      <p className="font-bold ">{client.height}</p>
                      <p className="font-bold ">Meters</p>
                    </div>
                  </div>
                  <div className="p-10 shadow-md shadow-gray-300 rounded-xl bg-white">
                    <BsFillPersonLinesFill className="text-5xl" />
                    <p className="text-gray-500 p-2 text-[23px]">Age</p>
                    <div className="flex items-start gap-3 text-[25px]">
                      <p className="font-bold ">{getCurrentAge(client.DOB)}</p>
                      <p className="font-bold ">Years</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="">
            <p className="text-4xl p-7">Meals</p>

            <table className="w-full border-collapse text-center bg-[white] shadow-lg rounded-lg shadow-gray-300 text-[17px] ">
              <thead className="p-9">
                <tr className="border-b text-gray-500 p-9">
                  <th className="p-6">Meal #</th>
                  <th>Meal Name</th>
                  <th>Meal Type</th>
                  <th>Meal Calories</th>
                  <th>Meal Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredMeals.map((meal, i) => {
                  return (
                    <tr key={i}>
                      <td className="p-7">{meal.meal_id}</td>
                      <td>{meal.meal_name}</td>
                      <td>{meal.meal_Type}</td>
                      <td>{meal.meal_calories}</td>
                      <td>{formatDateTime(meal.meal_date, meal.meal_time)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>Client Not Foud</div>
      )}

      {/* overlay */}

      {updateBtn ? (
        <div>
          <div className="w-full h-full bg-black/70 absolute top-0 left-0 z-[10]" />
          <div className="w-full h-full max-w-[500px] mx-auto absolute top-0 left-[35%] bg-[#ddd] z-[100] rounded-2xl">
            <div className="p-5 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <p className="font-bold p-3">Update Clinet Information :</p>
                <button
                  onClick={handleUpdate}
                  className=" py-2 px-5 bg-red-500 outline-none rounded-lg text-white"
                >
                  Cancel
                </button>
              </div>
              <p className=" text-gray-500">
                Note: Fill in all inputs even with previous data if you do not
                want to update
              </p>
              <form className="h-full">
                <label>Client Name</label>
                <input
                  onChange={(e) => {
                    setNewClientName(e.target.value);
                  }}
                  type="text"
                  required
                  className="w-full py-1 px-2 mt-2 mb-3 border-2 border-gray-300 rounded-lg outline-none"
                  placeholder="exp: Ali Khaled"
                />
                <label>Date of Birth</label>
                <input
                  onChange={(e) => {
                    setNewDateOfBirth(e.target.value);
                  }}
                  type="text"
                  required
                  className="w-full py-1 px-2 mt-2 mb-3 border-2 border-gray-300 rounded-lg outline-none"
                  placeholder="exp: 2001-02-05"
                />

                <label>Gender</label>
                <select
                  onChange={(e) => {
                    setNewGender(e.target.value);
                  }}
                  className="w-full py-1 px-2 mt-2 mb-3 border-2 border-gray-300 rounded-lg outline-none"
                >
                  <option value="Male">Choose an option</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <label>Weight</label>
                <input
                  onChange={(e) => {
                    setNewWeight(e.target.value);
                  }}
                  type="text"
                  required
                  className="w-full py-1 px-2 mt-2 mb-3 border-2 border-gray-300 rounded-lg outline-none"
                  placeholder="exp: 75.2 kg"
                />

                <label>Height</label>
                <input
                  onChange={(e) => {
                    setNewHeight(e.target.value);
                  }}
                  type="text"
                  required
                  className="w-full py-1 px-2 mt-2 mb-3 border-2 border-gray-300 rounded-lg outline-none"
                  placeholder="exp: 1.75 m"
                />

                <label>Contact Number</label>
                <input
                  onChange={(e) => {
                    setNewContactNumber(e.target.value);
                  }}
                  type="text"
                  required
                  className="w-full py-1 px-2 mt-2 mb-3 border-2 border-gray-300 rounded-lg outline-none"
                  placeholder="exp: +971565555555"
                />

                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full my-3 py-3 px-3 bg-blue-500 outline-none rounded-lg text-white"
                >
                  Update Client
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Client;
