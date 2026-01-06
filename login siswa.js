// js/login-siswa.js
import { auth, db, googleProvider } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= ELEMENT =================
const emailInput    = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btnLogin      = document.getElementById("btnLogin");
const btnGoogle     = document.getElementById("btnGoogle");

// ================= LOGIN EMAIL =================
btnLogin.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    Swal.fire("Oops", "Email dan password wajib diisi", "warning");
    return;
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await simpanUser(result.user);
    Swal.fire("Berhasil", "Login sukses", "success");
  } catch (err) {
    Swal.fire("Gagal", err.message, "error");
  }
});

// ================= LOGIN GOOGLE =================
btnGoogle.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await simpanUser(result.user);
    Swal.fire("Berhasil", "Login Google sukses", "success");
  } catch (err) {
    Swal.fire("Gagal", err.message, "error");
  }
});

// ================= SIMPAN USER KE FIRESTORE =================
async function simpanUser(user) {
  const ref = doc(db, "siswa", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      nama: user.displayName || "Siswa",
      email: user.email,
      role: "siswa",
      createdAt: serverTimestamp()
    });
  }
}

// ================= CEK LOGIN STATE =================
onAuthStateChanged(auth, (user) => {
  if (user) {
    tampilkanNama(user);
    aktifkanAkses();
  }
});

// ================= TAMPILKAN NAMA DI NAVBAR =================
function tampilkanNama(user) {
  const nav = document.querySelector(".nav-action");
  nav.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;font-weight:600">
      <i class="fa-solid fa-user"></i>
      <span>${user.displayName || user.email}</span>
    </div>
  `;
}

// ================= AKTIFKAN FLOW KELAS =================
function aktifkanAkses() {
  window.loggedIn = true;
}
