import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Page from './Page.jsx'
import Dashboard from "./Pages/Dashboard.jsx";

function App() {
    const [Isloggedin, setloggedin] = useState(false)
  const navigate = useNavigate();

  return (
    <div >
      <Routes>
        <Route path="/login" element={<Login setloggedin={setloggedin}/>} />
        <Route path="/" element={<Page />} />
        <Route path="/signup" element={<Signup />} />
      <Route path="*" element={ Isloggedin ? <Page></Page> : <Login setloggedin={setloggedin}/>} />
      </Routes>
      
    </div>
  );
} 
  
export default App;
