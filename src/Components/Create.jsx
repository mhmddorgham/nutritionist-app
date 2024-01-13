import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/create", {
        clientId: clientId,
        clientName: clientName,
        dateOfBirth: dateOfBirth,
        gender: gender,
        weight: weight,
        height: height,
        contactNumber: contactNumber,
      })
      .then(() => {
        setError("");
        console.log("Successfully Inserted Values");
        navigate("/");
      })
      .catch((err) => {
        setError(err);
      });
  };
  return (
    <div className="w-[100% - 250px] h-full ml-[250px] py-7 px-16 bg-[#F4F4F4] ">
      <div className="w-full max-w-[600px] mx-auto py-7">
        <div>
          <p className="text-3xl py-3 font-bold">Add New Client</p>
          <p className=" text-gray-500 text-[20px]">
            Add client information down below
          </p>
          {error ? <p className="p-3 font-bold text-red-500">{error}</p> : null}
        </div>

        <div className="p-7">
          <form>
            <label>Client ID</label>
            <input
              onChange={(e) => {
                setClientId(e.target.value);
              }}
              type="text"
              required
              className="w-full py-1 px-2 mt-2 mb-3 border-2 border-gray-300 rounded-lg outline-none"
              placeholder="Client #"
              autoFocus
            />
            <label>Client Name</label>
            <input
              onChange={(e) => {
                setClientName(e.target.value);
              }}
              type="text"
              required
              className="w-full py-1 px-2 mt-2 mb-3 border-2 border-gray-300 rounded-lg outline-none"
              placeholder="exp: Ali Khaled"
            />
            <label>Date of Birth</label>
            <input
              onChange={(e) => {
                setDateOfBirth(e.target.value);
              }}
              type="text"
              required
              className="w-full py-1 px-2 mt-2 mb-3 border-2 border-gray-300 rounded-lg outline-none"
              placeholder="exp: 2001-02-05"
            />

            <label>Gender</label>
            <select
              onChange={(e) => {
                setGender(e.target.value);
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
                setWeight(e.target.value);
              }}
              type="text"
              required
              className="w-full py-1 px-2 mt-2 mb-3 border-2 border-gray-300 rounded-lg outline-none"
              placeholder="exp: 75.2 kg"
            />

            <label>Height</label>
            <input
              onChange={(e) => {
                setHeight(e.target.value);
              }}
              type="text"
              required
              className="w-full py-1 px-2 mt-2 mb-3 border-2 border-gray-300 rounded-lg outline-none"
              placeholder="exp: 1.75 m"
            />

            <label>Contact Number</label>
            <input
              onChange={(e) => {
                setContactNumber(e.target.value);
              }}
              type="text"
              required
              className="w-full py-1 px-2 mt-2 mb-3 border-2 border-gray-300 rounded-lg outline-none"
              placeholder="exp: +971565555555"
            />

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full my-3 bg-[#ddd] py-3 px-3 hover:bg-blue-500 outline-none rounded-lg hover:text-white duration-200"
            >
              Add Client
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
