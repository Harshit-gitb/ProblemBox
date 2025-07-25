import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./Firebase.jsx";

import Page from "./Page.jsx";
import AuthFlipCard from "./Pages/AuthFlipCard"; // ✅ updated path
import RequireAdmin from "./utils/RequireAdmin";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const [admin,setAdmin] =useState(false)
  const [username, setUsername] = useState("")
  const [Isloggedin, setloggedin] = useState(null);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const location = useLocation();
  
  console.log(username);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setloggedin(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (Isloggedin === null) return;

    const publicPaths = ["/auth"];
    const isPublicPath = publicPaths.includes(location.pathname);

    if (Isloggedin && isPublicPath) {
      navigate("/", { replace: true });
    } else if (!Isloggedin && !isPublicPath) {
      navigate("/auth", { replace: true });
    }
  }, [Isloggedin, location.pathname, navigate]);

  return (
    <div>
      <Routes>
        <Route path="/auth" element={<AuthFlipCard setloggedin={setloggedin} setUsername={setUsername}/>} />
        <Route path="/admin" element={<RequireAdmin><AdminPanel /></RequireAdmin>} />
      <Route path="*" element={ Isloggedin ? <Page username={username} admin={admin} setAdmin={setAdmin} /> : <AuthFlipCard setloggedin={setloggedin} setUsername={setUsername}/>} />
      </Routes>
      
    </div>
  );
}

export default App;
