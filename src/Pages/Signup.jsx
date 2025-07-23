// src/Signup.jsx
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../Firebase.jsx";
import { saveUserToFirestore } from "../utils/firestoreHelpers.js";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User created:", user);
      await saveUserToFirestore(user);
      alert("Signup successful!");
      navigate('/login]')
    } catch (error) {
      alert("Signup error: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={styles.button}>Signup</button>
        <button type="buttpn" onClick={()=> navigate('/login')} style={styles.button}>already Login?</button>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: 20, maxWidth: 300, margin: "auto" },
  form: { display: "flex", flexDirection: "column", gap: 10 },
  input: { padding: 10, borderRadius: 5, border: "1px solid #ccc" },
  button: { padding: 10, background: "green", color: "white", border: "none", borderRadius: 5 }
};
