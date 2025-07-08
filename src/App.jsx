import React from "react";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Sidebar from "./components/Sidebar.jsx"
function App() {
  return (
    <div>
    <Sidebar />
      <h1 style={{ textAlign: "center" }}>ProblemBox 🔐</h1>
      <Signup />
      <hr />
      <Login />
    </div>
  );
}

export default App;
