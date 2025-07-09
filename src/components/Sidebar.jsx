import React from 'react';
import "../styles/sidebar.css";
import { Routes, Route, Link } from 'react-router-dom';
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
import Dashboard from './Dashboard';

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
    <aside className='sidebar'>

<div className='top'>
    ProblemBox 🔐
</div>
<div className='links_sidebar'>
    {/* links dashboard etc */}
    <Link to="/">
    <button className='sidebar_button'>
        Dashboard
    </button>
    </Link>
    <Link to="/raiseissue">
    <button className='sidebar_button'>
        Raise issue
    </button>
    </Link>
    <Link to="/reportedissue">
    <button className='sidebar_button'>
        Reported issue
    </button>
    </Link>
    <Link to="/adminpanel">
    <button className='sidebar_button'>
        Admin panel
    </button>
    </Link>
    <Link to="/userdashboard">
    <button className='sidebar_button'>
        User Dashboard
    </button>
    </Link>
</div>
<div className='botttom'>
    <Link to="/settings">
    <button>
        Settings
    </button>
    </Link>
    <Link to="/logout">
<button>
    Logout
</button>
    </Link>
</div>
    </aside>
    </>
  );
};

export default Sidebar;
