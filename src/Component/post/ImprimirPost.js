import {
  alConseguirRecetas,
  borrarReceta,
  conseguirReceta,
  actualizarReceta,
  sumarMeGusta,
  restarMeGusta,
  // guardarReceta,
} from '../../lib/firestore.js';
// eslint-disable-next-line import/no-cycle
import { datos } from '../../lib/index.js';

// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../../router.js';
// eslint-disable-next-line import/no-cycle

export const GetPost = () => {
  // DATOS DEL USUARIO EXISTENTE LOGUEADO
  const datosUsuario = datos();
  // ESTE ES EL UID DEL USUARIO EXISTENTE LOGUEADO
  const uidUsuario = datosUsuario.uidUsuario;
  const divPost = document.createElement('div');
  // const db = getFirestore();
  divPost.setAttribute('id', 'postPublicado'); // SE ENCARGA DE IMPRIMIR LAS RECETAS QUE ENCUENTRE EN LA BASE DE DATOS

  alConseguirRecetas((querySnapshot) => {
    while (divPost.firstChild) {
      divPost.removeChild(divPost.firstChild);
    }
    querySnapshot.forEach((doc) => {
      const publicacion = doc.data();
      const idPublicacion = publicacion.uidUsuario;
      const post = document.createElement('div');
      post.setAttribute('class', 'post');
      post.setAttribute('id', 'post');

      const contenedorInfoUsuario = document.createElement('div');
      contenedorInfoUsuario.setAttribute('id', 'contenedorInfoUsuario');
      const fotoPost = document.createElement('img');
      fotoPost.setAttribute('class', 'fotoPost');
      fotoPost.setAttribute('src', publicacion.foto || '../images/fotoperfil.png');

      const h3NombreUsuario = document.createElement('h3');

      h3NombreUsuario.textContent = publicacion.nombre || datosUsuario.emailUsuario;

      const h5Fecha = document.createElement('h6');
      h5Fecha.textContent = publicacion.fechaIString;

      const h4PublicacionReceta = document.createElement('h4');
      h4PublicacionReceta.textContent = publicacion.receta;

      // ESTE ES EL ESPACIO DEL BOTON DE LOS  PUNTITOS DE OPCIONES
      if (uidUsuario === idPublicacion) {
        const menu = document.createElement('IMG');
        menu.setAttribute('src', '../images/Puntos.png');

        const contenedorEdEl = document.createElement('div');
        contenedorEdEl.setAttribute('id', 'contenedorEdEl');

        const borrarPostBoton = document.createElement('button');
        borrarPostBoton.textContent = 'Borrar';
        // borrarPostBoton.setAttribute('data-id', doc.id);
        borrarPostBoton.setAttribute('class', 'borrarPost');
        borrarPostBoton.addEventListener('click', (e) => {
          e.preventDefault();
          /*    const contmodal = document.getElementById('contmodal');
        contmodal.style.visibility = 'visible';
        contmodal.style.opacity = '1'; */
          // console.log(doc.id);
          // eslint-disable-next-line no-undef
          Swal.fire({
            title: '¿Estas segur@?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000000',
            cancelButtonColor: '#9b9b9b',
            cancelButtonText: 'Cancelar',
            confirmButtonText: '¡Si,borrar!',
            width: '250px',
          })
            .then((result) => {
              if (result.isConfirmed) {
                borrarReceta(doc.id);
                // eslint-disable-next-line no-undef
                Swal.fire(
                  '¡Borrado!',
                  'Tu receta ha sido borrada con éxito.',
                );
                onNavigate('/muro');
              }
            });
        });

        const editarPostBoton = document.createElement('button');
        editarPostBoton.textContent = 'Editar';
        editarPostBoton.setAttribute('data-id', doc.id);
        editarPostBoton.setAttribute('class', 'editarPost');

        const menuOpciones = document.createElement('button');
        menuOpciones.setAttribute('id', 'menuOpciones');
        let valorVisual = true;
        menuOpciones.setAttribute('value', valorVisual);
        menuOpciones.addEventListener('click', () => {
          valorVisual = false;
          if (valorVisual === false) {
            borrarPostBoton.style.visibility = 'visible';
            borrarPostBoton.style.opacity = '1';
            editarPostBoton.style.visibility = 'visible';
            editarPostBoton.style.opacity = '1';
            valorVisual = true;
          } else {
            borrarPostBoton.style.visibility = 'hidden';
            borrarPostBoton.style.opacity = '0';
            editarPostBoton.style.visibility = 'hidden';
            editarPostBoton.style.opacity = '0';
          }
          valorVisual = true;
        }); valorVisual = true;

        const formPublicacion = document.getElementById('formPublicacion');
        let editandoReceta = false;
        let id = '';
        editarPostBoton.addEventListener('click', async ({ target: { dataset } }) => {
          const datosReceta = await conseguirReceta(dataset.id);
          const recetaEditar = datosReceta.data();
          formPublicacion.inputReceta.value = recetaEditar.receta;
          formPublicacion.inputIngredientes.value = recetaEditar.ingredientes;
          formPublicacion.inputProcedimiento.value = recetaEditar.procedimiento;
          editandoReceta = true;
          id = datosReceta.id;
          const btnPostear = document.getElementById('btnPostear');
          const btnActualizar = document.getElementById('btnActualizar');
          btnActualizar.addEventListener('click', (e) => {
            e.preventDefault();
            const receta = formPublicacion.inputReceta;
            const ingredientes = formPublicacion.inputIngredientes;
            const procedimiento = formPublicacion.inputProcedimiento;
            const categoria = formPublicacion.selectCategoria;
            // eslint-disable-next-line max-len
            // guardarReceta(inputReceta.value, inputIngredientes.value, inputProcedimiento.value, selectCategoria.value);
            if (editandoReceta === true) {
              actualizarReceta(id, {
                receta: receta.value,
                ingredientes: ingredientes.value,
                procedimiento: procedimiento.value,
                categoria: categoria.value,
              });
            }
            formPublicacion.reset();
            formPublicacion.style.visibility = 'hidden';
          });

          formPublicacion.style.visibility = 'visible';
          formPublicacion.style.opacity = '1';
        });
        contenedorInfoUsuario.append(
          contenedorEdEl,
          fotoPost,
          h3NombreUsuario,
          h5Fecha,
        );
        menuOpciones.appendChild(menu);
        contenedorEdEl.append(menuOpciones, borrarPostBoton, editarPostBoton);
      }

      const h3PublicacionReceta = document.createElement('h4');
      h3PublicacionReceta.textContent = publicacion.receta;

      const ingredientesP = document.createElement('pre');
      ingredientesP.textContent = publicacion.ingredientes;

      const publicacionProcedimientosP = document.createElement('pre');
      publicacionProcedimientosP.textContent = publicacion.procedimiento;

      const publicacionCategoriaP = document.createElement('p');
      publicacionCategoriaP.textContent = publicacion.categoria;

      const plato = document.createElement('img');
      plato.setAttribute('class', 'categoriaImg');
      plato.setAttribute('src', '../images/plato.png');

      const btnMeGusta = document.createElement('button');
      btnMeGusta.setAttribute('class', 'btnMeGusta');
      btnMeGusta.setAttribute('data-id', doc.id);
      btnMeGusta.setAttribute('value', false);

      const iconoMeGusta = document.createElement('IMG');
      iconoMeGusta.setAttribute('class', 'iconoMeGusta');
      iconoMeGusta.setAttribute('data-id', uidUsuario);
      const ObjectMeGusta = publicacion.meGusta;
      const arrayTotalMeGusta = Object.values(ObjectMeGusta);
      if (arrayTotalMeGusta.includes(uidUsuario)) {
        iconoMeGusta.src = '../images/meGusta.png';
      } else {
        iconoMeGusta.src = '../images/nomeGusta.png';
      }
      btnMeGusta.addEventListener('click', () => {
        if (arrayTotalMeGusta.includes(uidUsuario)) {
          restarMeGusta(doc.id, uidUsuario);
        } else {
          sumarMeGusta(doc.id, uidUsuario);
        }
      });

      btnMeGusta.append(iconoMeGusta);
      const numeroMeGusta = document.createElement('h5');
      const problema = publicacion.meGusta.length;
      numeroMeGusta.textContent = `${problema} Me gusta`;

      post.append(
        contenedorInfoUsuario,
        publicacionCategoriaP,
        plato,
        h4PublicacionReceta,
        ingredientesP,
        publicacionProcedimientosP,
        btnMeGusta,
        numeroMeGusta,
      );

      // postPublicado.appendChild(post);
      contenedorInfoUsuario.append(fotoPost, h3NombreUsuario, h5Fecha);
      divPost.append(post);
    });
  });
  return divPost;
};
