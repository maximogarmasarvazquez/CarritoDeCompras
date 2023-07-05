
// Declaro Variables
const carrito = document.querySelector('#carrito'); // metodo primer elemento del
// doc. que coicide con el selector
const listaProductos = document.querySelector('#lista-producto');//idem
const contenedorCarrito = document.querySelector('#lista-carrito tbody');//idem
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); //idem
const numeroCant = document.querySelector('#numeroCant'); //#


      let articulosCarrito = []

      class Producto { //#
          constructor(imagen, titulo,precio,precio2,id, cantidad) {
              this.imagen = imagen; 
              this.titulo = titulo;
              this.precio = precio;
              this.precio2 = precio2;
              this.id = id;
              this.cantidad = cantidad;
             
          }}

         
// Listeners escucho 
cargarEventListeners();
// hacemos tres listeners
function cargarEventListeners() {
     //no hacemos una funcion grande sino que 
     //haremos algunas para favoreces comprención 
     // Dispara cuando se presiona "Agregar Carrito"
     listaProductos.addEventListener('click', agregarProducto);//
     //metodo que indica al navegador que este atento a la interacción del usuario
     //escuchandooooo
     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarProducto);
     //escuchandooooo
     // Al Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  
}

// Funciones
// Función que añade el curso al carrito
function agregarProducto(e) {
     e.preventDefault();//no recarga la pantalla
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {// "e" se refiere al evento "target" se refiere al producto "contains" devuelkve un booleano
          const producto = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          console.log(producto)
          leerDatosProd(producto);
     }

}

// Lee los datos del curso
function leerDatosProd(producto) {

     //     const infoCurso = {                        remplazado al aplicar la clase constructor "Producto"
     //      imagen: curso.querySelector('img').src,
     //      titulo: curso.querySelector('h4').textContent,
     //      precio: curso.querySelector('.precio span').textContent,
     //      id: curso.querySelector('a').getAttribute('data-id'), 
     //      cantidad: 1 

         let imagen = producto.querySelector('img').src;
         let titulo = producto.querySelector('h4').textContent; 
         let precio = producto.querySelector('.precio span span').textContent;;
         let precio2= 0;    //despues la usamos para mostrar el total individual de cada compra  
         let id = producto.querySelector('a').getAttribute('data-id');
        let cantidad= 1;
        let numer = 0;  
       
  

     let infoProducto = new Producto(imagen, titulo, precio,precio2, id, cantidad); //# llamamos a la clase "Producto"

     if( articulosCarrito.some( producto => producto.id === infoProducto.id ) ) { 
          const productos = articulosCarrito.map( producto => {
               if( producto.id === infoProducto.id ) {
                    producto.cantidad++ ; 
                 
                   return producto;
                } else {
                    
                     return producto;
             }
          })
          articulosCarrito = [...productos];//copia el array productos
         
     }  else {
          articulosCarrito = [...articulosCarrito, infoProducto]; //copia su propio array y agrega el objeto infoproduct
     }

     

     articulosCarrito.forEach( producto => { // #  usamos foreach para recorrer producto y sumar la cantridad al contador (usamos producto que fue creado antes)
          if( producto.id === infoProducto.id ) {
              numer = numer + producto.cantidad ;
              return producto;
           } else {
               numer = numer + producto.cantidad ;
                return producto;
        }})

       
 cambiarPrecio(articulosCarrito)
 contador(numer); //#
 descuento(); //#
 carritoHTML(); 
 //#
}

// Elimina el curso del carrito en el DOM
function eliminarProducto(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-producto') ) {
          // e.target.parentElement.parentElement.remove();
          const productoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

          
          carritoHTML();
          vaciarContador();
     }
   
}



function sumarTotal(articulosCarrito){ //#
     

     let precios = articulosCarrito.map( producto => { // #con el map creamos un nuevo array que contiene solo los precios 
       
          return convertirPrecio(producto.precio) * producto.cantidad ;

     })


    console.log(precios);

     let total = 0;

     precios.forEach(prec =>{
         total = total + prec;
         
     })
     
     articulosCarrito.forEach(producto => {
               if(producto.cantidad > 2){
                    total = total - (total*0.15);
                  return total;
               }else{
                    return producto;
               }
          })
         
 if ( total != 0){ //if para que no me mustre el $0
    mostrarTotal(total);//llamamos a la funcion para inytectar el html
   }
          
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {
    
     contenedorCarrito.innerHTML = ''; // reiniciamos el carrito sin el usar la funcion vaciar carrito para no vaciar el array
   
    
     articulosCarrito.forEach(producto => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${producto.imagen}" width=100>
               </td>
               <td>${producto.titulo}</td>
               <td>$${producto.precio2}</td>
               <td>${producto.cantidad} </td>
               <td></td>
               <td>
                    <a href="#" onclick="desaprecerDescuento();" class="borrar-producto" data-id="${producto.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);

          
          
     });
     sumarTotal(articulosCarrito);

}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() { 
     // forma lenta
     articulosCarrito = []; // # vaciamos el array
     contenedorCarrito.innerHTML = '';
     desaprecerDescuento();//#


}

function contador(numCantidad) {//#

this.numCantidad = numCantidad;
    
     const row = document.createElement('p');
   vaciarContador();
     row.innerHTML = `
      <h2>  ${numCantidad} </h2>
          `;
          numeroCant.appendChild(row);         
}

function vaciarContador() { //# vacia el contador
   numeroCant.innerHTML=''
}

function descuento() {// # usamos el some para encontrar el numero 3 en valor.cantidad
  let desc = articulosCarrito.some(producto => { 
     let result = false;
     if(producto.cantidad > 2){
      result =  true;
      return result;
     }
   
    
    
})
if(desc == true ){
    

    document.getElementById("descuento").style.display = 'block';
 

}}

function desaprecerDescuento() {//#

     document.getElementById("descuento").style.display = 'none';

 }

function mostrarTotal(total){ //# mostramos el total
     console.log(total)
const row = document.createElement('tr');
          row.innerHTML = `
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td><h5>$${total}</h5></td>
               <td></td>
          `;
          contenedorCarrito.appendChild(row);
          
}

function cambiarPrecio(articulosCarrito){//# mostramos el total individual de cada compra

     let preciosCantidad = articulosCarrito.map( producto => { 
          producto.precio2 = convertirPrecio(producto.precio) * producto.cantidad;

     })
    articulosCarrito = [...preciosCantidad];


}

function convertirPrecio(moneda){// # funcion que mostro tiago 
     let numero = moneda.replace('.',''); //le saca el punto
     numero = parseFloat(numero); // convirte en un float al string
     return numero;
}