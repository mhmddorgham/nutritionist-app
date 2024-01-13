import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Client from "./Components/Client";
import Meals from "./Components/Meals";
import Analytics from "./Components/Analytics";
import Create from "./Components/Create";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/meals" element={<Meals />} />
        <Route exact path="/analytics" element={<Analytics />} />
        <Route exact path="/addclient" element={<Create />} />

        <Route exact path="/client/:id" element={<Client />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
