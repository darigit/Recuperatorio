// ========================================
// EXAMEN DE JAVASCRIPT - CARRITO DE COMPRAS SIMPLIFICADO
// PÁGINA PRINCIPAL DE PRODUCTOS
// ========================================

// INSTRUCCIONES PARA EL ESTUDIANTE:
// 1. Completa las funciones marcadas con "TODO"
// 2. Lee los comentarios cuidadosamente para entender qué hacer
// 3. Puedes usar console.log() para debuggear
// 4. El HTML y CSS ya están listos - enfócate solo en JavaScript

// ==========================================
// VARIABLES GLOBALES
// ==========================================

// TODO: Estas variables ya están declaradas para ayudarte
let todosLosProductos = []; // Array para guardar todos los productos del JSON
let carrito = []; // Array para el carrito de compras

// TODO: Referencias a elementos del DOM que necesitarás usar
const gridProductos = document.getElementById('productsGrid');
const contadorCarrito = document.getElementById('cartCount');

// ==========================================
// FUNCIÓN 1: CARGAR PRODUCTOS DESDE JSON (10 PUNTOS)
// ==========================================

/**
 * TODO: Completa esta función para cargar productos desde 'data/productos.json'
 * 
 * PASOS A SEGUIR:
 * 1. Usa fetch() para obtener el archivo 'data/productos.json'
 * 2. Convierte la respuesta a JSON
 * 3. Guarda los productos en la variable 'todosLosProductos'
 * 4. Llama a mostrarProductos() para mostrarlos en pantalla
 * 
 * PUNTOS EVALUADOS:
 * - Uso correcto de fetch() (3 pts)
 * - Manejo correcto de .then() o async/await (3 pts)
 * - Conversión correcta a JSON (2 pts)
 * - Llamada a mostrarProductos() (2 pts)
 */
async function cargarProductos() {
    try {
        // TODO: Escribe tu código aquí
        // Ejemplo: const respuesta = await fetch('data/productos.json');
        const respuesta = await fetch('../data/productos.json');
        if (!respuesta.ok) throw new Error("HTTP status " + respuesta.status);
        console.log("Respuesta HTTP:", respuesta.status);  
        const productos = await respuesta.json();
        mostrarProductos(productos.productos);
        todosLosProductos= productos.productos;
        
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// ==========================================
// FUNCIÓN 2: MOSTRAR PRODUCTOS EN EL DOM (15 PUNTOS)
// ==========================================

/**
 * TODO: Completa esta función para crear las tarjetas de productos
 * 
 * PASOS A SEGUIR:
 * 1. Limpia el contenido anterior del gridProductos
 * 2. Recorre el array 'productos' con forEach o for
 * 3. Para cada producto, crea un div con la información
 * 4. Agrega cada tarjeta al gridProductos
 * 
 * ESTRUCTURA HTML DE CADA TARJETA:
 * <div class="product-card">
 *   <img src="URL_IMAGEN" alt="NOMBRE">
 *   <h3>NOMBRE_PRODUCTO</h3>
 *   <p class="price">$PRECIO</p>
 *   <button onclick="agregarAlCarrito(ID)">Agregar al carrito</button>
 * </div>
 * 
 * PUNTOS EVALUADOS:
 * - Limpieza del grid anterior (2 pts)
 * - Uso correcto de createElement o innerHTML (5 pts)
 * - Mostrar imagen, nombre y precio (4 pts)
 * - Botón con onclick funcionando (4 pts)
 */
function mostrarProductos(productos) {
    // TODO: Escribe tu código aquí
    // Paso 1: Limpiar contenido anterior
    
      gridProductos.innerHTML = ''; 
    // Paso 2: Recorrer array de productos

     productos.forEach(producto => {
    
       const tarjetaProducto = document.createElement('div');
        tarjetaProducto.classList.add('product-card');
        
        tarjetaProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="price">${formatearPrecio(producto.precio)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        
        // Paso 4: Agregar tarjeta al grid
        gridProductos.appendChild(tarjetaProducto);
         });
    };
    // Paso 3: Crear tarjeta para cada producto
    
    
    
    


// ==========================================
// FUNCIÓN 3: AGREGAR AL CARRITO (20 PUNTOS)
// ==========================================

/**
 * TODO: Completa esta función para agregar productos al carrito
 * 
 * PASOS A SEGUIR:
 * 1. Busca el producto en todosLosProductos usando find()
 * 2. Verifica si el producto ya está en el carrito
 * 3. Si ya está, aumenta la cantidad
 * 4. Si no está, agrégalo con cantidad = 1
 * 5. Guarda el carrito en localStorage como JSON
 * 6. Actualiza el contador del carrito
 * 
 * PUNTOS EVALUADOS:
 * - Uso correcto de find() (3 pts)
 * - Lógica para verificar si ya existe (4 pts)
 * - Manejo correcto de cantidades (4 pts)
 * - Uso de localStorage con JSON (5 pts)
 * - Actualización del contador (4 pts)
 */
function agregarAlCarrito(idProducto) {
    // TODO: Escribe tu código aquí
    
 // Paso 1: Buscar el producto
    const producto = todosLosProductos.find(p => p.id === idProducto);
    
      if (!producto){
                return alert("no se encontro el producto")
      }

    // Paso 2: Obtener carrito actual de localStorage
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

     // Paso 3: Verificar si el producto ya está en el carrito

    const productoEnCarrito = carritoActual.find(p => p.id === idProducto);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carritoActual.push({ ...producto, cantidad: 1 });
    }

    // Paso 4: Agregar o actualizar cantidad

    localStorage.setItem('carrito', JSON.stringify(carritoActual));

     // Paso 6: Actualizar contador

    actualizarContadorCarrito();

    // Mensaje de confirmación (opcional)

    alert('Producto agregado al carrito!');
    
}

// ==========================================
// FUNCIÓN 4: ACTUALIZAR CONTADOR DEL CARRITO (5 PUNTOS)
// ==========================================

/**
 * TODO: Completa esta función para mostrar la cantidad total de productos
 * 
 * PASOS A SEGUIR:
 * 1. Obtén el carrito de localStorage
 * 2. Calcula el total de productos usando reduce()
 * 3. Muestra el número en el elemento contadorCarrito
 * 
 * PUNTOS EVALUADOS:
 * - Obtener datos de localStorage (2 pts)
 * - Uso correcto de reduce() (2 pts)
 * - Actualizar el DOM correctamente (1 pt)
 */
function actualizarContadorCarrito() {

      // Obtener el carrito de localStorage
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];

    // Calcular el total de productos en el carrito
    const totalProductos = carritoGuardado.reduce((total, producto) => total + producto.cantidad, 0);

    // Actualizar el contador en el DOM
    contadorCarrito.textContent = totalProductos;
    
}

// ==========================================
// FUNCIÓN DE FORMATEO (YA ESTÁ LISTA - NO TOCAR)
// ==========================================

/**
 * Función para formatear precios en pesos colombianos
 * ESTA FUNCIÓN YA ESTÁ COMPLETA - PUEDES USARLA DIRECTAMENTE
 */
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(precio);
}

// ==========================================
// INICIALIZACIÓN (YA ESTÁ LISTA - NO TOCAR)
// ==========================================

/**
 * Esta función se ejecuta cuando se carga la página
 * YA ESTÁ COMPLETA - NO TOCAR
 */
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Cargando tienda...');
    
    // Cargar productos al inicio
    cargarProductos();
    // Actualizar contador del carrito
    actualizarContadorCarrito();
    
    console.log('Tienda cargada');
});

// ==========================================
// NOTAS IMPORTANTES PARA EL ESTUDIANTE
// ==========================================

/*
CONSEJOS PARA COMPLETAR EL EXAMEN:

1. ORDEN RECOMENDADO:
   - Primero completa cargarProductos()
   - Luego mostrarProductos()
   - Después agregarAlCarrito()
   - Finalmente actualizarContadorCarrito()

2. DEPURACIÓN:
   - Usa console.log() para ver qué datos tienes
   - Abre las DevTools para ver errores
   - Verifica que localStorage se esté guardando

3. ARRAYS Y MÉTODOS IMPORTANTES:
   - find() - para buscar un producto por ID
   - forEach() - para recorrer productos
   - reduce() - para sumar cantidades
   - JSON.parse() - para leer de localStorage
   - JSON.stringify() - para guardar en localStorage

4. ESTRUCTURA DEL CARRITO EN LOCALSTORAGE:
   [
     { id: 1, nombre: "iPhone", precio: 899900, cantidad: 2 },
     { id: 3, nombre: "Camiseta", precio: 89900, cantidad: 1 }
   ]

5. PUNTOS CLAVE:
   - fetch() debe usar la ruta 'data/productos.json'
   - localStorage.setItem() guarda strings, usa JSON.stringify()
   - localStorage.getItem() devuelve strings, usa JSON.parse()
   - El grid tiene id "productsGrid"
   - El contador tiene id "cartCount"

¡RECUERDA LEER LOS COMENTARIOS CUIDADOSAMENTE!
*/