import { useState , useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Page from './Page.jsx'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./Firebase.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import UserDashboard from "./components/UserDashboard.jsx";

function App() {
    const [Isloggedin, setloggedin] = useState(false)
    const auth = getAuth(app)
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setloggedin(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  if (Isloggedin === null) {
    return <div>Loading...</div>; // or a spinner
  }
  return (
    <div >
      <Routes>
        <Route path="/login" element={<Login setloggedin={setloggedin}/>} />
        <Route path="/signup" element={<Signup />} />

      <Route path="*" element={ Isloggedin ? <Page /> : <Login setloggedin={setloggedin}/>} />
      </Routes>
      
    </div>
  );
} 
  
export default App;
