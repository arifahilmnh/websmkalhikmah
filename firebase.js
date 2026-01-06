// js/firebase.js

/* ===============================
   FIREBASE CORE CONFIG
================================ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

/* ===============================
   FIREBASE AUTH
================================ */
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* ===============================
   FIRESTORE DATABASE
================================ */
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===============================
   CONFIG (PUNYA KAMU)
================================ */
const firebaseConfig = {
  apiKey: "AIzaSyBQnQ_cETiZMXrDDzyg_1cfEnfTn-UmF0A",
  authDomain: "database-user-3d1bf.firebaseapp.com",
  projectId: "database-user-3d1bf",
  storageBucket: "database-user-3d1bf.firebasestorage.app",
  messagingSenderId: "786734472712",
  appId: "1:786734472712:web:555858156018bdfaa17bbd",
  measurementId: "G-TKR7MW4ZT4"
};

/* ===============================
   INITIALIZE FIREBASE
================================ */
const app = initializeApp(firebaseConfig);

/* ===============================
   SERVICES EXPORT
================================ */
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

/* ===============================
   EXPORT FOR GLOBAL USE
================================ */
export {
  app,
  analytics,
  auth,
  provider,
  db
};
