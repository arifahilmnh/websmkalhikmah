// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// Analytics OPSIONAL
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// ================= CONFIG (PUNYA KAMU) =================
const firebaseConfig = {
  apiKey: "AIzaSyBQnQ_cETiZMXrDDzyg_1cfEnfTn-UmF0A",
  authDomain: "database-user-3d1bf.firebaseapp.com",
  projectId: "database-user-3d1bf",
  storageBucket: "database-user-3d1bf.firebasestorage.app",
  messagingSenderId: "786734472712",
  appId: "1:786734472712:web:555858156018bdfaa17bbd",
  measurementId: "G-TKR7MW4ZT4"
};

// ================= INIT =================
const app = initializeApp(firebaseConfig);

// ================= EXPORT =================
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Analytics (AMAN, tidak wajib)
export const analytics = getAnalytics(app);
