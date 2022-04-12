// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
  query,
  arrayUnion,
  arrayRemove,
} from './Imports-firebase-store.js';
import { app } from './llavesFirebase.js';

// import {getStorage} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js';

const db = getFirestore();

export const guardarReceta = (fecha, foto, nombre, fechaIString, receta, ingredientes, procedimiento, categoria, uidUsuario, meGusta) => {
  if (receta === '' || ingredientes === '' || procedimiento === '') {
    // console.log('a ok');
  } else {
  /*  const auth = getAuth();
    const user = auth.currentUser; */

    addDoc(collection(db, 'recetas'), {
      fecha,
      foto,
      nombre,
      receta,
      fechaIString,
      ingredientes,
      procedimiento,
      categoria,
      uidUsuario,
      meGusta,
    });
  }
};
const q = query(collection(db, 'recetas'), orderBy('fecha', 'desc'));
export const conseguirRecetas = () => getDocs(collection(db, 'recetas'));
export const alConseguirRecetas = (callback) => onSnapshot(q, (collection(db, 'recetas'), callback));
export const borrarReceta = (id) => deleteDoc(doc(db, 'recetas', id));
export const conseguirReceta = (id) => getDoc(doc(db, 'recetas', id));
export const actualizarReceta = (id, nuevosCampos) => updateDoc(doc(db, 'recetas', id), nuevosCampos);
// export const storage = getStorage(app);
export const sumarMeGusta = (id, uidUsuario) => updateDoc(doc(db, 'recetas', id), { meGusta: arrayUnion(uidUsuario) });
export const restarMeGusta = (id, uidUsuario) => updateDoc(doc(db, 'recetas', id), { meGusta: arrayRemove(uidUsuario) });
