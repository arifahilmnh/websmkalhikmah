// js/login-siswa.js

/* ===============================
   IMPORT FIREBASE SERVICE
================================ */
import { auth, provider, db } from "./firebase.js";

import {
 signInWithEmailAndPassword,
 signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
 doc,
 setDoc,
 serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===============================
   ELEMENT
================================ */
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");
const btnGoogle = document.getElementById("btnGoogle");

/* ===============================
   SWEETALERT BASE
================================ */
const swalBase = Swal.mixin({
 confirmButtonColor: "#10b981",
 backdrop: `rgba(16,185,129,.15)`
});

/* ===============================
   LOGIN EMAIL & PASSWORD
================================ */
btnLogin?.addEventListener("click", async () => {
 const email = emailInput.value.trim();
 const password = passwordInput.value.trim();

 if (!email || !password) {
  return swalBase.fire({
   icon: "warning",
   title: "Data belum lengkap",
   text: "Email dan password wajib diisi"
  });
 }

 try {
  const res = await signInWithEmailAndPassword(auth, email, password);

  await saveUser(res.user);

  swalBase.fire({
   icon: "success",
   title: "Login berhasil 🎉",
   text: "Selamat datang kembali",
   timer: 1600,
   showConfirmButton: false
  }).then(() => {
   window.location.href = "BERANDA.html";
  });

 } catch (err) {
  handleAuthError(err);
 }
});

/* ===============================
   LOGIN GOOGLE
================================ */
btnGoogle?.addEventListener("click", async () => {
 try {
  const res = await signInWithPopup(auth, provider);

  await saveUser(res.user);

  swalBase.fire({
   icon: "success",
   title: "Login Google berhasil 🎉",
   timer: 1600,
   showConfirmButton: false
  }).then(() => {
   window.location.href = "BERANDA.html";
  });

 } catch (err) {
  handleAuthError(err);
 }
});

/* ===============================
   SAVE USER TO FIRESTORE
================================ */
async function saveUser(user) {
 if (!user) return;

 const userRef = doc(db, "users", user.uid);

 await setDoc(userRef, {
  uid: user.uid,
  nama: user.displayName || "Siswa",
  email: user.email,
  role: "siswa",
  lastLogin: serverTimestamp()
 }, { merge: true });
}

/* ===============================
   HANDLE ERROR
================================ */
function handleAuthError(error) {
 let message = "Terjadi kesalahan saat login";

 switch (error.code) {
  case "auth/user-not-found":
   message = "Akun tidak ditemukan";
   break;
  case "auth/wrong-password":
   message = "Password salah";
   break;
  case "auth/invalid-email":
   message = "Format email tidak valid";
   break;
  case "auth/popup-closed-by-user":
   message = "Login Google dibatalkan";
   break;
 }

 swalBase.fire({
  icon: "error",
  title: "Login gagal",
  text: message
 });
}
