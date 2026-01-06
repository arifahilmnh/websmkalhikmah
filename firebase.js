// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔑 Firebase Config (punya kamu)
const firebaseConfig = {
  apiKey: "AIzaSyBQnQ_cETiZMXrDDzyg_1cfEnfTn-UmF0A",
  authDomain: "database-user-3d1bf.firebaseapp.com",
  projectId: "database-user-3d1bf",
  storageBucket: "database-user-3d1bf.firebasestorage.app",
  messagingSenderId: "786734472712",
  appId: "1:786734472712:web:555858156018bdfaa17bbd",
  measurementId: "G-TKR7MW4ZT4"
};

// 🚀 Init Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Auth & DB
const auth = getAuth(app);
const db   = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// 📦 Export
export {
  auth,
  db,
  googleProvider
};
