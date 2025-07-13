import "../styles/sidebar.css";
import { Routes, Route, Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../Firebase.jsx";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully!");
        navigate("/login"); // redirect to login
      })
      .catch((error) => {
        alert("Logout failed: " + error.message);
      });
  };

  return (
    <>
      <aside className="sidebar">
        <div className="top  ">ProblemBox</div>
        <div className="links_sidebar">
          <div className="buttons" onClick={() => {navigate("/dashboard");}}> Dashboard
          </div>
          <div className="buttons" onClick={() => navigate("/raiseissue")} >
            Raise Issue
          </div>
          <div className="buttons"
            onClick={() => navigate("/reportedissue")}>
            Reported Issue
          </div>
          <div className="buttons"
            onClick={() => navigate("/adminpanel")}>
            Admin Panel
          </div>
          <div  className="buttons"
            onClick={() => navigate("/userdashboard")}
          >
            User Dashboard
          </div>
        </div>
        <div className="botttom">
          <div onClick={() => navigate('/setting')
          }>
            Settings
          </div>
          <Link to="/logout">
            <button>Logout</button>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
