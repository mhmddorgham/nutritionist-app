import React, { useState, useEffect } from "react";
import axios from "axios";

const Hero = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");

  const url = "http://localhost:3001/api/get";
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setError("");
        setClients(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [url]);
  return (
    <div className="w-full h-screen p-3">
      <div className="w-full h-full max-w-[1300px] mx-auto">
        {error ? <p className="p-4 text-red-600 font-bold">{error}</p> : null}
        {clients &&
          clients.map((client) => {
            return (
              <div className="p-7 shadow-lg shadow-gray-400  rounded-lg font-bold  ">
                <p>Client id: {client.client_id}</p>
                <p>Client Name: {client.client_name}</p>
                <p>Date of Birth: {client.DOB}</p>
                <p>Gender: {client.sex}</p>
                <p>Weight: {client.weight}</p>
                <p>Height: {client.height}</p>
                <p>Bmi: {client.bmi}</p>
                <p>Contact Number: {client.contact_num}</p>
                <p>Body Type: {client.body_type}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Hero;
