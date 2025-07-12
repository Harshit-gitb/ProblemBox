import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../Firebase.jsx";
import {
  faTachometerAlt,
  faPlus,
  faExclamationCircle,
  faUserShield,
  faUser,
  faCog,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully!");
        navigate("/login");
      })
      .catch((error) => alert("Logout failed: " + error.message));
  };

  const links = [
    { icon: faTachometerAlt, label: "Dashboard", path: "/dashboard" },
    { icon: faPlus, label: "Raise Issue", path: "/raiseissue" },
    { icon: faExclamationCircle, label: "Reported Issue", path: "/reportedissue" },
    { icon: faUserShield, label: "Admin Panel", path: "/adminpanel" },
    { icon: faUser, label: "User Dashboard", path: "/userdashboard" },
    { icon: faCog, label: "Settings", path: "/settings" },
  ];

  return (
<div className="h-screen bg-gray-900 text-white transition-all duration-300 group flex flex-col hover:w-64 w-16 overflow-hidden">
  {/* Header */}
  <div className="p-4 flex items-center space-x-3 h-14">
    <span className="text-xl">🔐</span>
    <span className="ml-2 text-lg font-bold transition-all duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap">
      ProblemBox
    </span>
  </div>

  {/* Sidebar Links */}
  <div className="flex flex-col flex-grow px-2">
    {links.map((link, i) => (
      <div
        key={i}
        onClick={() => navigate(link.path)}
        className="flex items-center h-12 space-x-4 cursor-pointer hover:bg-gray-700 px-3 rounded-md transition-all duration-200"
      >
        <FontAwesomeIcon icon={link.icon} size="lg" />
        <span className="text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap">
          {link.label}
        </span>
      </div>
    ))}
  </div>

  {/* Logout */}
  <div className="p-3 mt-auto">
    <div
      onClick={handleLogout}
      className="flex items-center h-12 space-x-4 cursor-pointer hover:bg-red-700 px-3 rounded-md transition-all duration-200"
    >
      <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
      <span className="text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap">
        Logout
      </span>
    </div>
  </div>
</div>

  );
}
