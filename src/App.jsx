import React from "react";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Sidebar from "./components/Sidebar.jsx"
import Raiseissue from "./components/Raiseissue.jsx";
import Dashboard from "./components/Dashboard.jsx";
function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>ProblemBox 🔐</h1>
      <Signup />
      <hr />
      <Login />
    </div>
  );
}

export default App;
