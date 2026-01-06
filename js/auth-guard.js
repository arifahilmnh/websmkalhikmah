import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

let isLoggedIn = false;

onAuthStateChanged(auth, (user) => {
  isLoggedIn = !!user;
});

export function requireLogin(action){
  if(!isLoggedIn){
    Swal.fire({
      icon:'info',
      title:'Harap login terlebih dahulu'
    }).then(()=>{
      document.querySelector('.hero-login')
        .scrollIntoView({behavior:"smooth", block:"center"});
    });
    return false;
  }
  action();
}
