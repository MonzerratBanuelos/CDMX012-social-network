import { alConseguirRecetas } from '../../lib/firestore.js';
import { eliminarPost } from './EliminarPost.js';
import { borrarReceta } from '../../lib/firestore.js';

const formPublicacion = document.getElementById('formPublicacion');
export const GetPost = () => {
  const divPost = document.createElement('div');
  divPost.setAttribute('id', 'postPublicado'); // SE ENCARGA DE IMPRIMIR LAS RECETAS QUE ENCUENTRE EN LA BASE DE DATOS
  alConseguirRecetas((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const publicacion = doc.data();

      const post = document.createElement('div');
      post.setAttribute('class', 'post');
      post.setAttribute('id', 'post');
      const h3PublicacionReceta = document.createElement('h3');
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
        const contmodal = document.getElementById('contmodal');
        contmodal.style.visibility = 'visible';
        contmodal.style.opacity = '1';
        console.log(doc.id);
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            borrarReceta(doc.id);
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
        // eliminarPost(doc.id);/* divPost.removeChild(post) */
      });

      const editarPostBoton = document.createElement('button');
      editarPostBoton.textContent = 'Editar';
      editarPostBoton.setAttribute('data-id', doc.id);
      editarPostBoton.setAttribute('class', 'editarPost');
      post.append(h3PublicacionReceta, ingredientesP, publicacionProcedimientosP, publicacionCategoriaP, borrarPostBoton, editarPostBoton, eliminarPost());
      postPublicado.appendChild(post);
      divPost.append(post);
    });
  });
  return divPost;
};
