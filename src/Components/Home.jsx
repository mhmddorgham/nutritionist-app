import React, { useState, useEffect } from "react";
import axios from "axios";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { Link } from "react-router-dom";

const Home = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
  return (
    <div className="w-[100% - 250px] h-screen ml-[250px] py-7 px-16 bg-[#F4F4F4] ">
      <div className="w-full py-7">
        <p className="text-3xl py-3 font-bold">Clients Information</p>
        <p className=" text-gray-500 text-[20px]">
          Click on the user to access their information
        </p>
        {error ? <p className="p-4 text-red-600 font-bold">{error}</p> : null}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="rounded-full border-4 border-gray-200 h-12 w-12 animate-spin"></div>
          </div>
        ) : null}
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-7 py-6 ">
        {clients &&
          clients.map((client) => {
            return (
              <Link to={`/client/${client.client_id}`}>
                <div
                  key={client.client_id}
                  className="p-5 shadow-lg shadow-gray-300 rounded-xl flex justify-start items-center bg-[#FEFEFF] gap-6 hover:shadow-gray-400 "
                >
                  {client.sex === "Male" ? (
                    <div className="text-[44px]">
                      <FcBusinessman />
                    </div>
                  ) : (
                    <div className="text-[44px]">
                      <FcBusinesswoman />
                    </div>
                  )}
                  <div>
                    <p className="text-[20px]">{client.client_name}</p>
                    <p className="text-gray-500 text-[19px]">
                      ID: #{client.client_id}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>

      <div className="flex justify-center items-center py-10 mt-9">
        <Link to="/addclient">
          <div className="px-9 py-4 text-[20px] text-white shadow-lg shadow-gray-300 rounded-xl text-center bg-blue-500 gap-6 hover:shadow-gray-400">
            Add Client
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
