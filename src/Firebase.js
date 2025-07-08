// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9Ow5FIll38ol-rGZlkSPsFzsHBTSAEvM",
  authDomain: "problem-box-42582.firebaseapp.com",
  projectId: "problem-box-42582",
  storageBucket: "problem-box-42582.firebasestorage.app",
  messagingSenderId: "160507316233",
  appId: "1:160507316233:web:8f93cf27f42e91ddddd0d8",
  measurementId: "G-0MBJD896JV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);