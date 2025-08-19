/* Añadiremos esto al main <p>Este es un ejemplo de trabajar con nodos en el DOM</p> */

const parrafo = document.createElement('p')
const textoParrafo = document.createTextNode('Este es un ejemplo de trabajar con nodos en el DOM')
parrafo.appendChild(textoParrafo)

document.body.appendChild(parrafo)

// Crear la ul y añadirla al main
const listaDesordenada = document.createElement('ul')
document.querySelector('main').appendChild(listaDesordenada)

/* Añadiremos un <li> con peras y manzanas */
// manejando el item de peras
const nodo1 = document.createElement('li')
const peras = document.createTextNode('peras')
nodo1.appendChild(peras)
/* nodo1.textContent = 'peras' */

// manejando el item de manzanas
const nodo2 = document.createElement('li')
const manzanasPt1 = document.createTextNode('Las ')
nodo2.appendChild(manzanasPt1)
const manzanasPt2 = document.createElement('em')
const textoManzanasPt2 = document.createTextNode('manzanas')
manzanasPt2.appendChild(textoManzanasPt2)
nodo2.appendChild(manzanasPt2)
const manzanasPt3 = document.createTextNode(' son ricas')
nodo2.appendChild(manzanasPt3)


// obteniendo listas y agregando nodos
/* const lista = document.getElementById('lista')
lista.appendChild(nodo1)
lista.appendChild(nodo2) */

listaDesordenada.appendChild(nodo1)
listaDesordenada.appendChild(nodo2)

// 5 segundos después de cargar la página, en la pokebola aparece pikachu
setTimeout(() => {
  const pokebola = document.getElementById('pokebola')
  pokebola.setAttribute('src', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png')
}, 5000)
