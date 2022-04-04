import { onNavigate } from '../router.js';
import { cerrar } from '../lib/index.js';
import { datos } from '../../lib/index.js';
import { GetPost } from './post/GetPost.js';
// import{ publicar } from '../main.js';
import { crearPost } from './post/CreatePost.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
// import { deletePost } from './post/DeletePost.js';

export const muro = () => {
  const pruebuski = datos();
// const pruebuski2 = pruebuski.map(function (x) {
  //    return x.displayName;
//  console.log(x.displayName);
 // });
  // console.log(datosUsuario);
  console.log(pruebuski);

 //  const auth = getA-uth();
  const seccionMuro = document.createElement('section');
  seccionMuro.setAttribute('id', 'seccionMuro');
  // Head
  const cabeza = document.createElement('nav');
  cabeza.setAttribute('id', 'cabeza');
  const logoYummi = document.createElement('IMG');
  logoYummi.src = './images/logo.png';
  logoYummi.setAttribute('id', 'logoMuro');
  logoYummi.setAttribute('alt', 'Yummy, bienvenido a tu mundo de cocina');
  const buscador = document.createElement('input');
  buscador.setAttribute('type', 'search');
  buscador.setAttribute('id', 'buscador');
  const lupa = document.createElement('button');
  lupa.setAttribute('id', 'lupita');
  const lupaImg = document.createElement('IMG');
  lupaImg.setAttribute('id', 'lupaimg');
  lupaImg.src = '../images/lupa.png';
  lupa.appendChild(lupaImg);
  const filtrador = document.createElement('select');
  filtrador.setAttribute('id', 'filtrador');
  const filtrarPor = document.createElement('option');
  filtrarPor.textContent = 'Filtrar por';
  filtrador.append(filtrarPor);
  cabeza.append(logoYummi, buscador, lupa, filtrador);

  const contenedorPerfil = document.createElement('article');
  contenedorPerfil.setAttribute('id', 'contenedorPerfil');
  const perfilCaja = document.createElement('section');
  perfilCaja.setAttribute('id', 'perfilCaja');
  const cajaPortada = document.createElement('div');
  cajaPortada.setAttribute('id', 'cajaPortada');
  const fotoPortada = document.createElement('IMG');
  fotoPortada.setAttribute('id', 'fotoPortada');
  fotoPortada.src = '../images/portada.png';
  const cajaFoto = document.createElement('div');
  cajaFoto.setAttribute('id', 'cajaFoto');
  const usuarioImg = document.createElement('IMG');
  usuarioImg.src = pruebuski.fotoUsuario ? pruebuski.fotoUsuario : '../images/fotoperfil.png';
  console.log(pruebuski.fotoUsuario);
  usuarioImg.setAttribute('id', 'fotousuario');
  const nombreUser = document.createElement('h1');
  nombreUser.setAttribute('id', 'nombreUser');
  nombreUser.textContent = pruebuski.nombre;
  const cerrarSesionImg = document.createElement('IMG');
  cerrarSesionImg.src = '../images/puerta.png';
  cerrarSesionImg.setAttribute('id', 'cerrarSesionImg');
  const btnCerrarSesion = document.createElement('button');// cerrar sesión cuenta
  btnCerrarSesion.setAttribute('type', 'button');
  // btnCerrarSesion.setAttribute('class', 'botones');
  btnCerrarSesion.setAttribute('id', 'btnCerrarSesion');
  btnCerrarSesion.textContent = 'Cerrar Sesion';
  btnCerrarSesion.appendChild(cerrarSesionImg);
  btnCerrarSesion.addEventListener('click', () => {
    cerrar();
    onNavigate('/');
  });
  const publicar = document.createElement('fieldset');
  publicar.setAttribute('id', 'publicar');
  const fotoUsuarioP = document.createElement('IMG');
  fotoUsuarioP.src = pruebuski.fotoUsuario;
  fotoUsuarioP.setAttribute('id', 'usuarioPublicar');
  const botonPublicar = document.createElement('button');
  botonPublicar.setAttribute('id', 'btnPublicar');
  botonPublicar.textContent = 'Comparte una nueva receta ...';
  publicar.append(fotoUsuarioP, botonPublicar);
  cajaPortada.appendChild(fotoPortada);
  cajaFoto.appendChild(usuarioImg);
  perfilCaja.append(cajaPortada, cajaFoto, nombreUser, btnCerrarSesion);
  contenedorPerfil.appendChild(perfilCaja);


  // eslint-disable-next-line max-len
  
  seccionMuro.append(cabeza, publicar, contenedorPerfil, crearPost(), GetPost());
  botonPublicar.addEventListener('click', (e) => {
    e.preventDefault();
    const formPublicacion = document.getElementById('formPublicacion');
    formPublicacion.style.visibility = 'visible';
  });
  return seccionMuro;
};
