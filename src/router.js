// Este es el punto de entrada de tu aplicacion

/* import { myFunction } from './lib/index.js';

myFunction(); */
// eslint-disable-next-line import/no-unresolved
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

// eslint-disable-next-line import/no-cycle
import { inicio } from './Component/inicio.js';
// eslint-disable-next-line import/no-cycle
import { muro } from './Component/muro.js';
// eslint-disable-next-line import/no-cycle
import { registro } from './Component/registro.js';

const rootDiv = document.getElementById('root');

const routes = {
  '/': inicio,
  '/registro': registro,
  '/muro': muro,
};

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  rootDiv.appendChild(routes[pathname]());
};
// eslint-disable-next-line prefer-const
let component = routes[window.location.pathname.replace('/CDMX012-social-network/src', '')];
console.log(window.location.pathname);
// window.onNavigate = onNavigate;
window.onpopstate = () => {
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[window.location.pathname]());
};

rootDiv.appendChild(component());

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user.emailVerified === true) {
    onNavigate('/muro');
  } else {
    onNavigate('/');
  }
});
