import React, { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import app from "../Firebase";

const auth = getAuth(app);
const db = getFirestore(app);

const RequireAdmin = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null); // null = loading, false = not admin, true = admin

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const role = docSnap.exists() ? docSnap.data().role : null;

      setIsAdmin(role === "Admin");
    });

    return () => unsubscribe();
  }, []);

  if (isAdmin === null) return <p>Loading...</p>;
  if (!isAdmin) return <Navigate to="/" />;

  return children;
};

export default RequireAdmin;
