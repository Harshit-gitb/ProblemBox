import React from "react";
import "../styles/sidebar.css";
import { Routes, Route, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../Firebase.jsx"; 
import { useNavigate } from "react-router-dom";

  const Sidebar = ({setActivePage}) => {
    const navigate = useNavigate();
    const auth = getAuth(app);
      
    const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      signOut(auth)
        .then(() => {
          alert("Logged out successfully!");
          navigate("/login");
        })
        .catch((error) => {
          alert("Logout failed: " + error.message);
        });
    }
  };

    return (
      <>
        <aside className="sidebar">
          <div className="top">ProblemBox 🔐</div>
          <div className="links_sidebar">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                  isActive ? "sidebar_button active" : "sidebar_button"
          }
          onClick={() => setActivePage("Dashboard")}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/raiseissue"
              className={({ isActive }) =>
                  isActive ? "sidebar_button active " : "sidebar_button"
          }
          onClick={() => setActivePage("Raise Issue")}
            >
              Raise Issue
            </NavLink>
            <NavLink
              to="/reportedissue"
              className={({ isActive }) =>
                  isActive ? "sidebar_button active " : "sidebar_button"
          }
          onClick={() => setActivePage("Reported Issue")}
            >
              Reported Issue
            </NavLink>
            <NavLink
              to="/adminpanel"
              className={({ isActive }) =>
                  isActive ? "sidebar_button active " : "sidebar_button"
          }
          onClick={() => setActivePage("Admin Panel")}
            >
              Admin Panel
            </NavLink>
            <NavLink
              to="/userdashboard"
              className={({ isActive }) =>
                  isActive ? "sidebar_button active " : "sidebar_button"
          }
          onClick={() => setActivePage("User Dashboard")}
            >
              User Dashboard
            </NavLink>

          </div>
          <div className="botttom">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                  isActive ? "sidebar_button active " : "sidebar_button"
          }
          onClick={() => setActivePage("Settings")}
            >
              Settings
            </NavLink>
            <Link to="/logout">
              <button onClick={handleLogout} >Logout</button>
            </Link>
          </div>
        </aside>
      </>
    );
  };

  export default Sidebar;
