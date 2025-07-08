// src/firebase.js
import { initializeApp } from "firebase/app";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD9Ow5FIll38ol-rGZlkSPsFzsHBTSAEvM",
  authDomain: "problem-box-42582.firebaseapp.com",
  projectId: "problem-box-42582",
  storageBucket: "problem-box-42582.appspot.com",
  messagingSenderId: "160507316233",
  appId: "1:160507316233:web:8f93cf27f42e91ddddd0d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
