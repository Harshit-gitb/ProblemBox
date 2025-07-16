import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./Firebase.jsx";
import Page from "./Page.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Layout from './components/Layout';



function App() {
  const [Isloggedin, setloggedin] = useState(null);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setloggedin(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (Isloggedin === null) return; // Wait for auth state to be determined

    const publicPaths = ["/login", "/signup"];
    const isPublicPath = publicPaths.includes(location.pathname);

    if (Isloggedin && isPublicPath) {
      navigate("/", { replace: true });
    } else if (!Isloggedin && !isPublicPath) {
      navigate("/login", { replace: true });
    }
  }, [Isloggedin, location.pathname, navigate]);

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
