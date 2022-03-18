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
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
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
      const uid = user.uid;
      const email = user.email;
      const emailVerificado = user.emailVerified;
      //const textoVerificado = '';
      if (emailVerificado === false){
       alert('Email no verificado');
       onNavigate('/');
      }
      else {
       alert('Email verificado');
      alert('Estas logueado');
      onNavigate('/muro');
      // eslint-disable-next-line prefer-template
      document.getElementById('mensajeLogin').textContent = ' Estas Logueado ' + email;
    } /* else {
      console.log(user.uid);
      alert('No estas logueado :( ');
    } */
  }
});
}
export function usuarioExistente() { // OBSERVADOR 
  const emailLogin = document.getElementById('email').value;
  const contraseñaLogin = document.getElementById('contraseña').value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, emailLogin, contraseñaLogin)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      alert(errorCode);
      const errorMessage = error.message;
      alert(errorMessage);
    });
}
export function verificarCorreo() {
  const auth = getAuth();
  sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
    });
}
export function registrar() {
  const email = document.getElementById('emailRegi').value;
  const contraseña = document.getElementById('contraseñaRegi').value;
  const contraseñaConfirmar = document.getElementById('contraseñaRegidos').value;
  const auth = getAuth();
  if (contraseña === contraseñaConfirmar){
  createUserWithEmailAndPassword(auth, email, contraseña )
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage + errorCode);
      // ..
    })
    .then (function() {
    verificarCorreo();
    alert('Registrado exitosamente,Porfavor verifica tu correo')
    });onNavigate('/');
}
else {
  alert('Las contraseñas no coinciden');
}
}
export function cerrar() {
  getAuth().signOut()
    .then(
      function() {
        alert ( 'Cerraste sesión');
      },
    )
    .catch(function (error) {
      alert('No fue posible completar tu petición intentalo más tarde');
    });
}
export function google() {
  const auth = getAuth();
  signInWithPopup(auth, proveedor)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const fotoUsuario = user.photoURL; // AQUI ESTA LA FOTO DEL USUARIO 
      onNavigate('/muro');
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
