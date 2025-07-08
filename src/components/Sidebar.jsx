import React from 'react';
import "../styles/sidebar.css";
import { getAuth, signOut } from "firebase/auth";
import app from "../Firebase.jsx"; // make sure the casing matches your actual file name
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faSignOutAlt,
  faUser,
  faBug,
  faUserShield
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully!");
        navigate("/"); // redirect to login
      })
      .catch((error) => {
        alert("Logout failed: " + error.message);
      });
  };

  return (
    <>
      <aside>
        <div className='top bg-blue-400'>
          ProblemBox 🔐
        </div>

        <div className='links_sidebar'>
          <button className='sidebar_button'>
            Dashboard
          </button>
          <button className='sidebar_button'>
            Raise issue
          </button>
          <button className='sidebar_button'>
            Reported issue
          </button>
          <button className='sidebar_button'>
            Admin panel
          </button>
          <button className='sidebar_button'>
            User Dashboard
          </button>
        </div>

        <div className='botttom'>
          <button>
            <FontAwesomeIcon icon={faGear} /> Settings
          </button>
          <button onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
