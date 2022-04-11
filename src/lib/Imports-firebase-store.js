// Funciones desde firestore
export {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  onSnapshot,
  doc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';

// Funciones desde Firebase
export {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
