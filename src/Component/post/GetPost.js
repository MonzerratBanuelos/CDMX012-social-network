import {
  alConseguirRecetas, borrarReceta, conseguirReceta, actualizarReceta, guardarReceta
} from '../../lib/firestore.js';
import { datos } from '../../lib/index.js';
// import { mostrarBoton } from './EditarPost.js';

// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../../router.js';

const datosUsuario = datos();
console.log(datosUsuario);
//localStorage.getItem('nombre', datos.displayName);
//console.log(datosUsuario);
export const GetPost = () => {
  const divPost = document.createElement('div');
  divPost.setAttribute('id', 'postPublicado'); // SE ENCARGA DE IMPRIMIR LAS RECETAS QUE ENCUENTRE EN LA BASE DE DATOS
  alConseguirRecetas((querySnapshot) => {
    while (divPost.firstChild) {
      divPost.removeChild(divPost.firstChild);
    }
    querySnapshot.forEach((doc) => {
      const publicacion = doc.data();
      // console.log(publicacion);
      // (console.log(publicacion));
      const post = document.createElement('div');
      post.setAttribute('class', 'post');
      post.setAttribute('id', 'post');

      const contenedorInfoUsuario = document.createElement('div');
      contenedorInfoUsuario.setAttribute('id', 'contenedorInfoUsuario');
      const fotoPost = document.createElement('img');
      fotoPost.setAttribute('class', 'fotoPost');
      fotoPost.setAttribute('src', publicacion.foto || '../images/fotoperfil.png');

      const h3NombreUsuario = document.createElement('h3');
      h3NombreUsuario.textContent = publicacion.nombre || publicacion.verificado;
      

      const menuOpciones = document.createElement('button');
      menuOpciones.setAttribute('id', 'menuOpciones');
      menuOpciones.textContent = '...';

      contenedorInfoUsuario.append(fotoPost, h3NombreUsuario, menuOpciones);

      const h3PublicacionReceta = document.createElement('h4');
      h3PublicacionReceta.textContent = publicacion.receta;

      const ingredientesP = document.createElement('pre');
      ingredientesP.textContent = publicacion.ingredientes;

      const publicacionProcedimientosP = document.createElement('pre');
      publicacionProcedimientosP.textContent = publicacion.procedimiento;

      const publicacionCategoriaP = document.createElement('p');
      publicacionCategoriaP.textContent = publicacion.categoria;
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
      const formPublicacion = document.getElementById('formPublicacion');
      let editandoReceta = false;
      let id = '';
      editarPostBoton.addEventListener('click', async ({ target: { dataset } }) => {
        const editarPost1 = divPost.querySelectorAll('.editarPost');
        console.log(editarPost1);
        // editarPost1.forEach((btn) => {
        /// console.log(btn);
        // btn.addEventListener('click', async ({ target: { dataset } }) => {
        const datosReceta = await conseguirReceta(dataset.id);
        const recetaEditar = datosReceta.data();
        formPublicacion.inputReceta.value = recetaEditar.receta;
        formPublicacion.inputIngredientes.value = recetaEditar.ingredientes;
        formPublicacion.inputProcedimiento.value = recetaEditar.procedimiento;
        editandoReceta = true;
        id = datosReceta.id;
        const btnActualizar = document.getElementById('btnActualizar');
        btnActualizar.addEventListener('click', (e) => {
          e.preventDefault();
          const receta = formPublicacion.inputReceta;
          const ingredientes = formPublicacion.inputIngredientes;
          const procedimiento = formPublicacion.inputProcedimiento;
          const categoria = formPublicacion.selectCategoria;
          console.log('holiwi');
          // eslint-disable-next-line max-len
          // guardarReceta(inputReceta.value, inputIngredientes.value, inputProcedimiento.value, selectCategoria.value);
          if (editandoReceta === true) {
            console.log('Estoy actualizando');
            actualizarReceta(id, {
             receta: receta.value, ingredientes: ingredientes.value, procedimiento: procedimiento.value, categoria: categoria.value,
            });
          }
          formPublicacion.reset();
          formPublicacion.style.visibility = 'hidden';
        });

        formPublicacion.style.visibility = 'visible';
        formPublicacion.style.opacity = '1';
      });
      post.append(contenedorInfoUsuario,h3PublicacionReceta, ingredientesP, publicacionProcedimientosP, publicacionCategoriaP, borrarPostBoton, editarPostBoton);
      // postPublicado.appendChild(post);
      
      divPost.append(post);
    // console.log(divPost);
    });
  // });
  // });
 });
  return divPost;
};
