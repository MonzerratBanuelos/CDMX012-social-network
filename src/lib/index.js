// aqui exportaras las funciones que necesites
/*
export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
}; */
// Import the functions you need from the SDKs you need
import { onNavigate } from '../main.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
// import { modal } from '../Component/modal.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export { getAuth, onAuthStateChanged };
export const firebaseConfig = {
  apiKey: 'AIzaSyAC5Xdg_jFGY0p6OJSwkX52fkXRqdKnjqw',
  authDomain: 'yummy-65cbb.firebaseapp.com',
  projectId: 'yummy-65cbb',
  storageBucket: 'yummy-65cbb.appspot.com',
  messagingSenderId: '857667491932',
  appId: '1:857667491932:web:94c7de43766d973cedae99',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const proveedor = new GoogleAuthProvider();
export function iniciarSesion() {
  const autentificar = getAuth();
  onAuthStateChanged(autentificar, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
      const email = user.email;
      const emailVerificado = user.emailVerified;
        if (emailVerificado === false) {
          document.getElementById('contmodal').style.opacity = '1';
          document.getElementById('contmodal').style.visibility = 'visible';
          document.getElementById('mensajemal').textContent = 'Email no verificado';
      } else {
        console.log(user);
        onNavigate('/muro');
        // eslint-disable-next-line prefer-template
        document.getElementById('mensajeLogin').textContent = ' Estas Logueado ' + email;
  }
    }
    onNavigate('/');
  });
}
export const usuarioExistente = (emailLogin, contraseñaLogin) =>
  signInWithEmailAndPassword(getAuth(), emailLogin, contraseñaLogin);
export function verificarCorreo() {
  const auth = getAuth();
  sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
    });
}
/* export function correoContraseña() {
  const auth = getAuth();
sendPasswordResetEmail(auth, email)
    .then(() => {
    // Password reset email sent!
    // ..
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    });
} */
export function registrar() {
  const email = document.getElementById('emailRegi').value;
  const contraseña = document.getElementById('contraseñaRegi').value;
  const contraseñaConfirmar = document.getElementById('contraseñaRegidos').value;
  const auth = getAuth();
  if (contraseña === contraseñaConfirmar) {
    createUserWithEmailAndPassword(auth, email, contraseña)
      // eslint-disable-next-line no-unused-vars
      .then((userCredential) => {
      // Signed in
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage + errorCode);
        // ..
      })
      .then(() => {
        verificarCorreo();
        alert('Registrado exitosamente,Porfavor verifica tu correo');
        document.getElementById('contmodal').style.opacity = '1';
        document.getElementById('contmodal').style.visibility = 'visible';
        document.getElementById('mensajemal').textContent = 'Registrado exitosamente';
      }); onNavigate('/');
  } else {
    alert('Las contraseñas no coinciden');
  }
}
export function cerrar() {
  signOut(getAuth())
    .then(
      () => {
        alert('Cerraste sesión');
      },
    )
    // eslint-disable-next-line no-unused-vars
    .catch(() => {
      alert('No fue posible completar tu petición intentalo más tarde');
    });
}
export function google() {
  const auth = getAuth();
  signInWithPopup(auth, proveedor)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // eslint-disable-next-line no-unused-vars
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // The signed-in user info.
      // eslint-disable-next-line no-unused-vars
      const user = result.user;
      console.log(user);
      onNavigate('/muro');
      // ...
    // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
      // Handle Errors here.
      // The email of the user's account used.
      // The AuthCredential type that was used.
      // eslint-disable-next-line no-unused-vars
      // ...
    });
}
//export function datos() {
  export const auth = getAuth();
  export const user = auth.currentUser;
  //if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    //const displayName = user.displayName;
    //const email = user.email;
    //const photoURL = user.photoURL;
    //const emailVerified = user.emailVerified;
  
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    //const uid = user.uid;
//}
  //return { user };
//}
