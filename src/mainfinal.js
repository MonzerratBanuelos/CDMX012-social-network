import {
  guardarReceta,
 conseguirRecetas,
 alConseguirRecetas,
 borrarReceta,
 conseguirReceta,
 actualizarReceta,
}
  from "./lib/firestore.js";

const formPublicacion = document.getElementById('formPublicacion');
const postPublicado = document.getElementById('postPublicado');
let editandoReceta = false;
let id = '';

window.addEventListener('DOMContentLoaded', () => {
  alConseguirRecetas((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const publicacion = doc.data();
      
      const post = document.createElement('div');
      post .setAttribute('class', 'post');
        // <h3>${publicacion.receta}</h3>
const h3PublicacionReceta = document.createElement('h3');
h3PublicacionReceta.textContent = publicacion.receta;
const ingredientesP = document.createElement('p');
ingredientesP.textContent = publicacion.ingredientes;
       // <p>${publicacion.procedimiento}</p>
const publicacionProcedimientosP = document.createElement('p');
publicacionProcedimientosP.textContent = publicacion.procedimiento;
        // <p>${publicacion.categoria}</p>
const publicacionCategoriaP = document.createElement('p');
publicacionCategoriaP.textContent = publicacion.categoria;
const borrarPostBoton = document.createElement('button');
borrarPostBoton.textContent = 'Borrar';
borrarPostBoton.setAttribute('data-id', doc.id);
borrarPostBoton.setAttribute('class', 'borrarPost');
       // <button class = 'borrarPost' data-id= "${doc.id}"> Borrar </button>
       const editarPostBoton = document.createElement('button');
       editarPostBoton.textContent = 'Editar';
       editarPostBoton.setAttribute('data-id', doc.id);
       editarPostBoton.setAttribute('class', 'editarPost');
       // <button class = 'editarPost' data-id= "${doc.id}"> Editar </button>
       post.append(h3PublicacionReceta, ingredientesP, publicacionProcedimientosP, publicacionCategoriaP, borrarPostBoton, editarPostBoton);
   postPublicado.appendChild(post);
   const borrarPost = postPublicado.querySelectorAll('.borrarPost');
    borrarPost.forEach((btn) => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        postPublicado.removeChild(post);
        await borrarReceta(dataset.id);
        
      /* Las dos lineas de arriba es simplificado de : event.target.dataset.id
 (obtiene el id del boton desde firestore) A esto se le llama destructuración */
      });
    });
    const editarPost = postPublicado.querySelectorAll('.editarPost');
    editarPost.forEach((btn) => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        const datosReceta = await conseguirReceta(dataset.id);
        const recetaEditar = datosReceta.data();
        formPublicacion.inputReceta.value = recetaEditar.receta;
        formPublicacion.inputIngredientes.value = recetaEditar.ingredientes;
        formPublicacion.inputProcedimiento.value = recetaEditar.procedimiento;
        editandoReceta = true;
        id = datosReceta.id;
      });
    });
      });
    
    
  });
});

formPublicacion.addEventListener('submit', (e) => {
  e.preventDefault();
  const receta = formPublicacion.inputReceta;
  const ingredientes = formPublicacion.inputIngredientes;
  const procedimiento = formPublicacion.inputProcedimiento;
  const categoria = formPublicacion.selectCategoria;
  console.log(categoria);
  if (!editandoReceta) {
    guardarReceta(receta.value, ingredientes.value, procedimiento.value, categoria.value);
  } else {
    actualizarReceta(id, { receta: receta.value, ingredientes: ingredientes.value, procedimiento: procedimiento.value, categoria: categoria.value});
  }

  formPublicacion.reset();
});
