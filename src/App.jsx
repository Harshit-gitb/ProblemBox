// src/App.jsx
import React,{useState} from "react";
import { Routes, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Raiseissue from "./components/Raiseissue.jsx";
import ReportedIssue from "./components/ReportedIssue.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import Settings from "./components/Settings.jsx";
import UserDashboard from "./components/UserDashboard.jsx";
import Login from "./Login.jsx";


function App() {
  const [activePage, setActivePage] = useState("Dashboard");
console.log(activePage);

  return (
    <div>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar 
        setActivePage={setActivePage}
        />
        <div style={{ flex: 1, padding: "20px" }}>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/raiseissue" element={<Raiseissue />} />
              <Route path="/adminpanel" element={<AdminPanel />} /> {/* ✅ */}
                <Route path="/userdashboard" element={<UserDashboard />} />
               <Route path="/Login" element={<Login/>} />

                
              {/* <Route path="/reportedissue" element={<ReportedIssue />} />
             <Route path="/reportedissue" element={<ReportedIssue />} />
              <Route path="/adminpanel" element={<AdminPanel />} />
            
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
