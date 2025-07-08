// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  return (
    <div>
<<<<<<< HEAD
      <Sidebar />
=======
>>>>>>> 7216e34996d5f84ef6b5f97b11ee556bb5398c71
      <h1 style={{ textAlign: "center" }}>ProblemBox 🔐</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
