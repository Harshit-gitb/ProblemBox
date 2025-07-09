// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Sidebar from "./components/Sidebar.jsx"
import Raiseissue from "./components/Raiseissue.jsx";
function App() {
  return (
    <div>
      <Sidebar />
      <h1 style={{ textAlign: "center" }}>ProblemBox 🔐</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Raiseissue/>
    </div>
  );
}

export default App;
