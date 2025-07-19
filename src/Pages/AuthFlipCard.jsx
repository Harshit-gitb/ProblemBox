import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import app from "../Firebase.jsx";
import { saveUserToFirestore } from "../utils/firestoreHelpers.js";

const auth = getAuth(app);

export default function AuthFlipCard({ setloggedin,setUsername }) {
  const [isFlipped, setIsFlipped] = useState(false);
  // const [name, setUserName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password,name);
      const userCredential = await signInWithEmailAndPassword(auth, email, password,name);
      const user = userCredential.user;
      const username = user.displayName || name // Use displayName or fallback to name
      alert("Login successful!");
      setUsername(username);
      navigate("/dashboard");
      console.log(username);
      setloggedin(true);
    } catch (error) {
      console.log("yha aagya login m");
      alert("Login error: " + error.message);
    }
  };

  

  const handleSignup = async (e) => {
    e.preventDefault();
     // ✅ Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password, name);
      const user = userCredential.user;
      await updateProfile(userCredential.user, { displayName: name }); // Set the display name
      await saveUserToFirestore(user);
      const username = user.displayName || name; // Use displayName or fallback to name
      setUsername(username);
      alert("Signup successful!");
      // setUsername(displayName)
      setIsFlipped(false);
    } catch (error) {
      console.log("yaha aagya");
      alert("Signup error: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.card, transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        {/* Login Form */}
        <div style={{ ...styles.face, ...styles.front }}>
          <h2 style={styles.heading}>Login</h2>
          <form onSubmit={handleLogin} style={styles.form}>
            <input type="email" placeholder="Email" style={styles.input} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" style={styles.input} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" style={{ ...styles.button, background: "#d4af37" }}>Login</button>
          </form>
          <button onClick={() => setIsFlipped(true)} style={styles.linkBtn}>
            Don't have an account? <strong>Sign Up</strong>
          </button>
        </div>

        {/* Signup Form */}
        <div style={{ ...styles.face, ...styles.back }}>
          <h2 style={styles.heading}>Signup</h2>
          <form onSubmit={handleSignup} style={styles.form}>
            <input type="text" placeholder="UserName" style={styles.input} onChange={(e) => setUserName(e.target.value)} />
            <input type="email" placeholder="Email" style={styles.input} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" style={styles.input} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" style={styles.input} onChange={(e) => setConfirmPassword(e.target.value)} />
          
            <button style={{ ...styles.button, background: "#c9b037" }}>Sign Up</button>
          </form>
          <button onClick={() => setIsFlipped(false)} style={styles.linkBtn}>
            Already have an account? <strong>Login</strong>
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    perspective: "1000px",
    width: "320px",
    margin: "auto",
    marginTop: "100px"
  },
  card: {
    width: "100%",
    height: "340px",
    position: "relative",
    transition: "transform 0.8s",
    transformStyle: "preserve-3d"
  },
  face: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#fdfcf7", // soft ivory
    borderRadius: "15px",
    boxShadow: "0 6px 18px rgba(110, 100, 65, 0.3)",
    padding: "25px"
  },
  front: {
    zIndex: 2
  },
  back: {
    transform: "rotateY(180deg)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d4af37",
    background: "#fffdf7"
  },
  button: {
    padding: "12px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  linkBtn: {
    marginTop: "14px",
    background: "none",
    border: "none",
    color: "#c9b037",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: "bold"
  },
  heading: {
    color: "#8b7500",
    marginBottom: "15px"
  }
};
