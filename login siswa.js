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

// ================= GLOBAL LOGIN STATE =================
window.isUserLoggedIn = false;

// ================= LOGIN EMAIL =================
btnLogin?.addEventListener("click", async () => {
  const email = emailInput?.value.trim();
  const password = passwordInput?.value.trim();

  if (!email || !password) {
    Swal.fire("Oops", "Email dan password wajib diisi", "warning");
    return;
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await simpanUser(result.user);

    Swal.fire({
      icon: "success",
      title: "Login berhasil",
      text: "Silakan pilih kelas",
      timer: 1600,
      showConfirmButton: false
    }).then(() => {
      document.querySelector(".hero-login")?.style.display = "none";
    });

  } catch (err) {
    Swal.fire("Login gagal", err.message, "error");
  }
});

// ================= LOGIN GOOGLE =================
btnGoogle?.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await simpanUser(result.user);

    Swal.fire({
      icon: "success",
      title: "Login Google berhasil",
      text: "Silakan pilih kelas",
      timer: 1600,
      showConfirmButton: false
    }).then(() => {
      document.querySelector(".hero-login")?.style.display = "none";
    });

  } catch (err) {
    Swal.fire("Login Google gagal", err.message, "error");
  }
});

// ================= SIMPAN USER FIRESTORE =================
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
    window.isUserLoggedIn = true;
    tampilkanNama(user);
    document.body.classList.add("logged-in");
  } else {
    window.isUserLoggedIn = false;
    document.body.classList.remove("logged-in");
  }
});

// ================= TAMPILKAN NAMA DI NAVBAR =================
function tampilkanNama(user) {
  const nav = document.querySelector(".nav-action");
  if (!nav) return;

  nav.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;font-weight:600">
      <i class="fa-solid fa-user"></i>
      <span>${user.displayName || user.email}</span>
    </div>
  `;
}
