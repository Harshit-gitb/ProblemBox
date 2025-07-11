import { useState , useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Page from './Page.jsx'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./Firebase.jsx";
import Dashboard from "./Pages/Dashboard.jsx";



function App() {
  const [Isloggedin, setloggedin] = useState(null);
  const auth = getAuth(app);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setloggedin(!!user);
      // Redirect based on auth state
      if (user) {
        if (window.location.pathname === "/login" || window.location.pathname === "/signup") {
          navigate("/", { replace: true });
        }
      } else {
        if (window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
          navigate("/login", { replace: true });
        }
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

 
  return (
    <div >
      <Routes>
        <Route path="/login" element={<Login setloggedin={setloggedin}/>} />
        <Route path="/signup" element={<Signup />} />
      <Route path="*" element={ Isloggedin ? <Page /> : <Login setloggedin={setloggedin}/>} />
      </Routes>++
      
    </div>
  );
} 
  
export default App;
