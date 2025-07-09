// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Raiseissue from "./components/Raiseissue.jsx";
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/raiseissue" element={<Raiseissue />} />
              {/* <Route path="/reportedissue" element={<ReportedIssue />} />
              <Route path="/adminpanel" element={<AdminPanel />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<div>Logging out...</div>} /> */}
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
