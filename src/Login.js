import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
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
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: 20, maxWidth: 300, margin: "auto" },
  form: { display: "flex", flexDirection: "column", gap: 10 },
  input: { padding: 10, borderRadius: 5, border: "1px solid #ccc" },
  button: { padding: 10, background: "blue", color: "white", border: "none", borderRadius: 5 }
};
