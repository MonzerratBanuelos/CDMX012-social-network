import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from './Imports-firebase-store.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../router.js';

// Initialize Firebase

export const proveedor = new GoogleAuthProvider();
export function iniciarSesion() {
  const autentificar = getAuth();
  onAuthStateChanged(autentificar, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
      const email = user.email;
      const emailVerificado = user.emailVerified;
      // const nombreUsuario = user.displayName;
      // const uid = user.uid;
      // const fotoUsuario = user.photoURL;
      if (emailVerificado === false) {
        document.getElementById('contmodal').style.opacity = '1';
        document.getElementById('contmodal').style.visibility = 'visible';
        document.getElementById('mensajemal').textContent = 'Email no verificado';
      } else {
        onNavigate('/muro');
        // eslint-disable-next-line prefer-template
        document.getElementById('mensajeLogin').textContent = ' Estas Logueado ' + email;
      }
    }
  });
}
export function usuarioExistente() { // OBSERVADOR
  const emailLogin = document.getElementById('email').value;
  const contraseñaLogin = document.getElementById('contraseña').value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, emailLogin, contraseñaLogin)
    // eslint-disable-next-line no-unused-vars
    .then((userCredential) => {
    // Signed in
    })
    .catch((error) => {
      const errorCode = error.code;
      document.getElementById('contmodal').style.opacity = '1';
      document.getElementById('contmodal').style.visibility = 'visible';
      document.getElementById('mensajemal').textContent = errorCode;
      const errorMessage = error.message;
      document.getElementById('contmodal').style.opacity = '1';
      document.getElementById('contmodal').style.visibility = 'visible';
      document.getElementById('mensajemal').textContent = errorMessage;
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
  if (contraseña === contraseñaConfirmar) {
    createUserWithEmailAndPassword(auth, email, contraseña)
      // eslint-disable-next-line no-unused-vars
      .then((userCredential) => {
        verificarCorreo();
        document.getElementById('contmodal').style.opacity = '1';
        document.getElementById('contmodal').style.visibility = 'visible';
        document.getElementById('iconomal').src = '../images/palomita.png';
        document.getElementById('mensajemal').textContent = 'Registrado exitosamente, verifica tu correo';
      })
      .catch((error) => {
        const errorMessage = error.message;
        document.getElementById('contmodal').style.opacity = '1';
        document.getElementById('contmodal').style.visibility = 'visible';
        document.getElementById('mensajemal').textContent = errorMessage;
      });
  } else {
    document.getElementById('contmodal').style.opacity = '1';
    document.getElementById('contmodal').style.visibility = 'visible';
    document.getElementById('mensajemal').textContent = 'Las contraseñas no coinciden';
  }
}

export function cerrar() {
  getAuth().signOut()
    .then(
      () => {
        document.getElementById('contmodal').style.opacity = '1';
        document.getElementById('contmodal').style.visibility = 'visible';
        document.getElementById('mensajemal').textContent = 'Vuelve pronto';
        document.getElementById('iconomal').src = '../images/logo.png';
      },
    )
    // eslint-disable-next-line no-unused-vars
    .catch((error) => {
      document.getElementById('contmodal').style.opacity = '1';
      document.getElementById('contmodal').style.visibility = 'visible';
      document.getElementById('mensajemal').textContent = error.message;
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
export function datos() {
  const auth = getAuth();
  const user = auth.currentUser;
  let datosUsuario = {};
  if (user !== null) {
    datosUsuario = {
      nombre: user.displayName,
      fotoUsuario: user.photoURL,
      verificado: user.emailVerified,
      emailUsuario: user.email,
      uidUsuario: user.uid,
    };
  }
  return datosUsuario;
}
