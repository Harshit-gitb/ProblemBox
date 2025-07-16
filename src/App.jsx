import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./Firebase.jsx";

import Page from "./Page.jsx";
import AuthFlipCard from "./Pages/AuthFlipCard"; // ✅ updated path

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
        <Route path="/auth" element={<AuthFlipCard setloggedin={setloggedin} />} />
        <Route path="*" element={Isloggedin ? <Page /> : <AuthFlipCard setloggedin={setloggedin} />} />
      </Routes>
    </div>
  );
}

export default App;
