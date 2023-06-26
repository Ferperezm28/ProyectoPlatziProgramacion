////verificar que funcione
//alert("Hola mundo js")

//Varialbes de las funciones
//Funcion iniciar juego
const sectionAtaque = document.getElementById('seleccionar-ataque');//crear funcion de la seccion de html en js
const sectionReiniciar = document.getElementById('reiniciar');
const botonPersonajeJugador = document.getElementById('boton-personaje');
//const botonSangre = document.getElementById('boton-sangre');
//const botonMoco = document.getElementById('boton-moco');
//const botonFlujo = document.getElementById('boton-flujo');
const botonReiniciar = document.getElementById('boton-reiniciar');

//funcion sleccionar personaje jugador
//crear variables de radio
//const inputHechicera = document.getElementById('hechicera'); //acceder al elemento
//const inputDoncella = document.getElementById('doncella');
//const inputMadre = document.getElementById('madre'); variables reubicadas por inyeccion d elementos
const spanPersonajeJugador = document.getElementById('personaje-jugador'); //acceder al elemento span de html
const sectionPersonaje = document.getElementById('seleccionar-personaje');
//let sectionAtaque = document.getElementById('seleccionar-ataque');

//funcion seleccionar personaje enemigo
const spanPersonajeEnemigo = document.getElementById('personaje-enemigo');

//funcion combate
//vidas - sleccionar span
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

//funcion crear mensaje
//Llamar mensajes
const sectionMensajes = document.getElementById('resultados'); //Mensaje resultado
const ataquesDelJugador = document.getElementById('ataques-jugador'); //Mensjae de ataque jugador
const ataquesDelEnemigo = document.getElementById('ataques-enemigo'); //Mensaje de ataque enemigo

//funcion crear mensaje final
//let sectionMensajes = document.getElementById('resultados');
//let botonSangre = document.getElementById('boton-sangre');
//let botonMoco = document.getElementById('boton-moco');
//let botonFlujo = document.getElementById('boton-flujo');
//let sectionReiniciar = document.getElementById('reiniciar');

//Contenedor para agregar tarjetas en html
const contenedorTarjetas = document.getElementById('contenedorTarjetas') //tarjetas personajes
const contenedorAtaques = document.getElementById('contendorAtaques'); //tarjetas poderes

//back end
let jugadorId = null; //variable del id del jugador
let enemigoId = null; //variable del id del enemigo colisionado

//Array personajes
let arquetipos = []; //personajes del jugador
let arquetiposEnemigos = []; //personajes enemigos

let opcionDePersonajes //varible para guardar estructura html
//Variables de personajes
let inputHechicera 
let inputDoncella 
let inputMadre 

let arquetipoJugador //variable para guardar el personaje seleccionado

let poderesJugador //varaible para insertar la estrusturade botones de ataque
let poderesEnemigo //identificar el arreglo de ataques del personaje enemigo

//Nombrar variables para los botones ataques
let botonSangre = document.getElementById('boton-sangre');
let botonMoco = document.getElementById('boton-moco');
let botonFlujo = document.getElementById('boton-flujo');

let botones = []; // arreglo para guardar los botones creados 

let ataqueJugador = []; //arreglo global de ataque jugador, para guardas la secuencia de ataques
let ataqueEnemigo = [] //arreglo de ataque contricante

// guardar ataques para imprimir
let indexAtaqueJugador;
let indexAtaqueEnemigo;

//contar victorias
let victoriasJugador = 0; //variable global vidas del jugador
let victoriasEnemigo = 0; //variable global vidas del enemigo

//variables del mapa canvas
const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');
let lienzo = mapa.getContext('2d'); //varible para dibujar dentro
let intervalo; //Variable para movimiento continuo
let mapaBackground = new Image(); //crear nueva imagen para el fondo
mapaBackground.src = './assets/mapa.png'; //asignar imagen al fondo
let personajeJugadorObjeto; //variable para guardad objeto seleccionado
//tamaño del mapa responsive
let alturaMapa;
let anchoMapa = window.innerWidth - 20; //tamño de la pantalla menos un margen
const anchoMaximo = 420; //para pantallas muy grandes

//delimitar tamño maximo del mapa
if(anchoMapa > anchoMaximo) {
    anchoMapa = anchoMaximo -20;
}
alturaMapa = anchoMapa * 600 / 800; //mandtener proporcion del tamaño

//tamaño del mapa
mapa.width = anchoMapa;
mapa.height = alturaMapa;


//Clase de personajes
class Arquetipo {
    constructor(nombre, foto, vida, fotoMapa, id = null){ //definir las Propiedades de los objetos
        this.id = id; //id del jugador 
        this.nombre = nombre; //guardar variable que viene de la propiedad 
        this.foto = foto;
        this.vida = vida;
        this.poderes = []; //Arreglo de ataques
        this.ancho = 60; //tamaño default de los personajes en canvas
        this.alto = 60;
        this.mapaFoto = new Image(); //crear imagen del personaje
        this.mapaFoto.src = fotoMapa;//añadir la direccion de la nueva imagen
        this.x = aleatorio(0, mapa.width - this.ancho); //posicion aleatroia de los personajes en canvas
        this.y = aleatorio(0, mapa.height - this.alto);
        this.velocidadx = 0; //inicializar velocidad para movimiento continuo
        this.velocidady = 0;
    } 

    //metodo de clase / funcion para pintar personajes en canvas
    pintarArquetipo() {
        lienzo.drawImage( //valores necesarios para ejecutar
        this.mapaFoto, 
        this.x,
        this.y,
        this.ancho,
        this.alto,
        )
    }
}

//construir objeto personaje
let hechicera = new Arquetipo ('Hechicera', './assets/hechicera.png', 5, './assets/hechiceraface.png'); //propiedades del objeto
//console.log(hechicera) //verificar que se crea el objeto
let doncella = new Arquetipo ('Doncella', './assets/doncella.png', 5, './assets/docellaface.png');
let madre = new Arquetipo ('Madre', './assets/madre.png', 5, './assets/madreface.png');
//Personajes enemigos
/*DESDE BACK END
let hechiceraEnemigo = new Arquetipo ('Hechicera', './assets/hechicera.png', 5, './assets/hechiceraface.png');
let doncellaEnemigo = new Arquetipo ('Doncella', './assets/doncella.png', 5, './assets/docellaface.png');
let madreEnemigo = new Arquetipo ('Madre', './assets/madre.png', 5, './assets/madreface.png');
*/

//crear ataques a cada objeto
const HECHICERA_ATAQUES = [ //LISTA DE LOS TIPOS DE ATAQUES
    { nombre: '🩸', id:'boton-sangre'}, //objetos literarios
    { nombre: '🩸', id:'boton-sangre'},
    { nombre: '🩸', id:'boton-sangre'},
    { nombre: '💧', id:'boton-moco'},
    { nombre: '💦', id:'boton-flujo'},
];
const DONCELLA_ATAQUES = [
    { nombre: '💦', id:'boton-flujo'}, //objetos literarios
    { nombre: '💦', id:'boton-flujo'},
    { nombre: '💦', id:'boton-flujo'},
    { nombre: '🩸', id:'boton-sangre'},
    { nombre: '💧', id:'boton-moco'},
];
const MADRE_ATAQUES = [
    { nombre: '💧', id:'boton-moco'}, //objetos literarios
    { nombre: '💧', id:'boton-moco'},
    { nombre: '💧', id:'boton-moco'},
    { nombre: '🩸', id:'boton-sangre'},
    { nombre: '💦', id:'boton-flujo'},
];
hechicera.poderes.push(...HECHICERA_ATAQUES); //AGREGAR ATAQUES
doncella.poderes.push(...DONCELLA_ATAQUES);
madre.poderes.push(...MADRE_ATAQUES);
/* ENEMIGOS DESDE BACK END
hechiceraEnemigo.poderes.push(...HECHICERA_ATAQUES);
doncellaEnemigo.poderes.push(...DONCELLA_ATAQUES);
madreEnemigo.poderes.push(...MADRE_ATAQUES);*/

//agregar valores al array
arquetipos.push(hechicera, doncella, madre);
//console.log(arquetipos) //verificar que el arreglo tiene valores

//funcion para ejecutar juego
function iniciarJuego() {
    //ocultar seccion
    sectionAtaque.style.display = 'none'; //propiedad para ocultar de la pantalla
    sectionReiniciar.style.display = 'none';
    sectionVerMapa.style.display = 'none';

    //crear tarjetas personajes
    arquetipos.forEach( (arquetipo) => { //por cada elemento
        //console.log(arquetipo.nombre)
        //estructura html
        opcionDePersonajes = ` 
        <input type="radio" name="personaje" id=${arquetipo.nombre} />
            <label class="tarjeta-personajes" for=${arquetipo.nombre}>
                <p>${arquetipo.nombre}</p>
                <img src=${arquetipo.foto} alt=${arquetipo.nombre}>
            </label>  
        ` //sustituir los valores por variables.

        //inyectar informacion en html
        contenedorTarjetas.innerHTML += opcionDePersonajes;

        //asignar id a las variables de personajes
        inputHechicera = document.getElementById('Hechicera')
        inputDoncella = document.getElementById('Doncella')
        inputMadre = document.getElementById('Madre')
    })

   //Reconocer la seleccion de un personaje
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);

    /*//escuchar evnetos de ataques
    botonSangre.addEventListener('click', ataqueSangre);
    botonMoco.addEventListener('click', ataqueMoco);
    botonFlujo.addEventListener('click', ataqueFlujo);*/

    //escuchar evento de reiniciar
    botonReiniciar.addEventListener('click', reiniciarJuego);

    unirseAlJuego() //llamar la funcion para cada jugador
}

//funcion para enviar peticiones al servidor
function unirseAlJuego() {
    fetch("http://192.168.0.13:8080/unirse") //metodo para peticion get a la uri
        .then(function(res){
            if(res.ok){ //si la respuesta se recibio
                res.text() //obtener el texto del objeto res
                    .then(function(respuesta){
                        console.log(respuesta) //imprimir id
                        jugadorId = respuesta; //darle un id al jugador
                    })
            }
        })
}

//Funcion para saber que personaje selecciono
function seleccionarPersonajeJugador(){
    //ocultar/mostrar secciones
    let jugar = 1;

    if (inputHechicera.checked) { //verificar que fue seleccionado true
        //alert('Seleccionaste a Hechicera');
        spanPersonajeJugador.innerHTML = inputHechicera.id; //personalizar texto segun el personaje 
        arquetipoJugador = inputHechicera.id; //guardar el nombre del personaje sleccionado
    } //asignar valor dinamicamente
    else if (inputDoncella.checked) {
        //alert('Seleccionaste a Doncella');
        spanPersonajeJugador.innerHTML = inputDoncella.id;
        arquetipoJugador = inputDoncella.id;
    }
    else if (inputMadre.checked) {
        //alert('Seleccionaste a Madre');
        spanPersonajeJugador.innerHTML = inputMadre.id;
        arquetipoJugador = inputMadre.id;
    }
    else {
        alert('Selecciona un arquetipo')
        jugar = 0;
        //reiniciarJuego();
    }

    if(jugar == 1) { //verificar que selecciono personaje
        //enviar datos al back end
        seleccionarArquetipo(arquetipoJugador);

        extraerPoderes(arquetipoJugador); //llamar funcion para obtener los ataques del personaje selecciondo
        //seleccionarPersonajeEnemigo(); //mascota del enemigo llamar funcion
        //ocultar seccion personaje
        sectionPersonaje.style.display = 'none';
        //mostrar seccion ataque        
        //sectionAtaque.style.display = 'flex'; //estilo para css, antes block, por flex

        //mostras seccion de mapa
        sectionVerMapa.style.display = 'flex';
        iniciarMapa ();
        
    }

}

//funcion para enviar datos del mokepon seleccionado al back end
function seleccionarArquetipo(arquetipoJugador) {
    fetch(`http://localhost:8080/cyclopon/${jugadorId}`, { //url
        method: "post", //tipo de peticion
        headers: { 
            "Content-type": "application/json" //tipo de datos
        },
        body: JSON.stringify ({ //convertir objeto json a texto
            cyclopon: arquetipoJugador //datos  a enviar
        })
    })
}

//funcion para obtener los ataques del personaje selecciondo del jugador
function extraerPoderes(arquetipoJugador) {
    let ataques;
    for (let i = 0; i < arquetipos.length; i++){ //iterar en el arreglo de arquetipos
        if (arquetipoJugador == arquetipos[i].nombre){ // obtener el valor del personaje en el arreglo
            ataques = arquetipos[i].poderes; //guardar los poderes del personje
        }
    }
    //console.log(ataques); //verificar que funciona
    mostrarPoderes (ataques); // llamar funcion para crear botones de ataques
}

//crear los botones de ataques
function mostrarPoderes(ataques) { //recibe el arreglo personalizado

    ataques.forEach((ataque) =>{
        poderesJugador = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `; //estructura del boton poderes, dos clases

        //insertar en html cada boton
        contenedorAtaques.innerHTML += poderesJugador;
    });

    //ligar botones con el id
    botonSangre = document.getElementById('boton-sangre');
    botonMoco = document.getElementById('boton-moco');
    botonFlujo = document.getElementById('boton-flujo');

    //popular el arreglo botones
    botones = document.querySelectorAll('.BAtaque');
    //console.log(botones)

}

//funcion para agregar eventos a los botones y hacer un arreglo de ataques
function secuenciaAtaque() {
    botones.forEach((boton) => { //por cada boton en el arreglo
        boton.addEventListener('click', (e) => { //añade un evento click, y accede a  ese evento
            //console.log(e.target.textContent)
            if (e.target.textContent == '🩸') { //compara el contenido del boton del evento con cada poder
                ataqueJugador.push('MENSTRUACION') //añade un elemento a la secuencia de ataque
                console.log(ataqueJugador) //muestra el arreglo con la secuencia de ataque
                boton.style.background = '#FFBF9B' //desabilita visualmente el boton usado
                boton.disabled = true; // deshabilitar boton
            } else if (e.target.textContent == '💧') {
                ataqueJugador.push('MOCO')
                console.log(ataqueJugador)
                boton.style.background = '#FFBF9B'
                boton.disabled = true;
            }else {
                ataqueJugador.push('FLUJO')
                console.log(ataqueJugador)
                boton.style.background = '#FFBF9B'
                boton.disabled = true;
            }
            /*/ataque enemigo
            ataqueAleatorio()*/
            //enviar poderes al back end
            if(ataqueJugador.length === 5){
                enviarAtaques();
            }
            
        })
    })

}

//enviar ataques del jugador al back end
function enviarAtaques() {
    fetch(`http://192.168.0.22:8080/cyclopon/${jugadorId}/ataques`, { //direccion del servicio
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador //enviar array de ataques
        })
    })

    intervalo = setInterval(obtenerAtaques, 50); //realizar una peticion al back end reptidamente
}

//obtenr ataques del contrincande desde el back end
function obtenerAtaques() {
    fetch(`http://192.168.0.22:8080/cyclopon/${enemigoId}/ataques`) //peticion get
    .then(function(res){
        if(res.ok){
            res.json()
            .then(function({ataques}){ //accedemos a los datos enviados
                if(ataques.length === 5){
                    ataqueEnemigo = ataques; //guardamos los ataques
                    combate(); //comparamos ataques
                }
            })
        }
    })
}

function seleccionarPersonajeEnemigo (enemigo) {
   //seleccionar personaje de manera aleatoria
    /*let personajeAleatorio = aleatorio(0, arquetipos.length - 1); //numero aleatorio
    //rango segun los subimdices del arreglo
    
    //conocer al personaje enemigo
    spanPersonajeEnemigo.innerHTML = arquetipos[personajeAleatorio].nombre;
   //personaje en la posicion n y su propiedad nombre.
   //ataques del personaje enmigo
    poderesEnemigo = arquetipos[personajeAleatorio].poderes; */

    //seleccionar personaje por colision
    spanPersonajeEnemigo.innerHTML = enemigo.nombre; //personalizar nombre enemigo
    poderesEnemigo = enemigo.poderes; //definir ataques del personaje enmigo
   
    secuenciaAtaque(); //llamar funcion ataque
}

function aleatorio (min, max) { //funcion aleatoria reciclada

    return Math.floor(Math.random()*(max-min+1)+min);
}


//Funcion de ataque aleatorio
function ataqueAleatorio() {
    let aleatorioEnemigo = aleatorio(0, poderesEnemigo.length -1); //numero para el ataque
    //console.log(poderesEnemigo[aleatorioEnemigo].nombre);
    
    if(poderesEnemigo[aleatorioEnemigo].nombre == '🩸') {
        ataqueEnemigo.push('MENSTRUACION');
    } else if(poderesEnemigo[aleatorioEnemigo].nombre == '💧') {
        ataqueEnemigo.push('MOCO');
    } else {
        ataqueEnemigo.push('FLUJO');
    }
    console.log(ataqueEnemigo);

    //llamar a funcion iniciar pelea.
    iniciarPelea()
}

//funcion para condicionar el combate
function iniciarPelea() {
    if(ataqueJugador.length === 5){
        //Llamar al combate para conocer el ganador
        combate();
    }
}

// guardar ataques 
function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

//logica para conocer al vencedor
function combate() {
    clearInterval(intervalo); //detener intervalo de peticiones

    //recorrer los arreglos de ataques
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensajes('EMPATE 🤨')

        } else if(ataqueJugador[index] == 'MOCO' && ataqueEnemigo[index] == 'FLUJO') {
            indexAmbosOponentes(index, index)
            crearMensajes('GANASTE 🤩')
            
            victoriasJugador++ //sumar victoria
            spanVidasJugador.innerHTML = victoriasJugador;

        } else if (ataqueJugador[index] == 'MENSTRUACION' && ataqueEnemigo[index] == 'MOCO'){
            indexAmbosOponentes(index, index)
            crearMensajes('GANASTE 🤩')
            
            victoriasJugador++ //sumar victoria
            spanVidasJugador.innerHTML = victoriasJugador;

        } else if (ataqueJugador[index] == 'FLUJO' && ataqueEnemigo[index] == 'MENSTRUACION'){
            indexAmbosOponentes(index, index)
            crearMensajes('GANASTE 🤩')
            
            victoriasJugador++ //sumar victoria
            spanVidasJugador.innerHTML = victoriasJugador;

        } else {
            indexAmbosOponentes(index, index)
            crearMensajes('PERDISTE 😭')
            
            victoriasEnemigo++ //sumar victoria
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }

    //revisar victorias
    revisarVidas();
  
}

//Mensajes de resultados y ataques
function crearMensajes(resultado) {
    //Mensaje
    //let notificacion = document.createElement('p');
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');
    
    //Enviar los resultados de las variables a nuestros parrafos
    sectionMensajes.innerHTML = resultado //Enviar el parrafo directamente
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;
    
    //Enviar parrafo
    //sectionMensajes.appendChild(notificacion);
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

//funcion para compara el n de victorias
function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un EMPATE 😎");
    }
    else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("Felicitaciones! GANASTE 🎉");
    } else {
        crearMensajeFinal('Lo siento, PERDISTE ⏳');
    }
}

//Mensajes final de juego
function crearMensajeFinal(resultadoFinal) {

    //crear mensaje
    //let parrafo = document.createElement('h3');
    sectionMensajes.innerHTML = resultadoFinal; //Enviar mensaje directamente

    //deshabilitar botones
    //botonSangre.disabled = true; //activar atributo disabled
    
    //mostrar seccion de reiniciar
    sectionReiniciar.style.display = 'block';

}

//funcion reiniciar juego
function reiniciarJuego() {
    //funcio para recargar ubicacion
    location.reload();
}

//Canvas
function PintarCanvas() { //Dibujar personaje en canvas
    personajeJugadorObjeto.x = personajeJugadorObjeto.x + personajeJugadorObjeto.velocidadx; //actualizar posicion
    personajeJugadorObjeto.y = personajeJugadorObjeto.y + personajeJugadorObjeto.velocidady;
    lienzo.clearRect(0,0,mapa.clientWidth,mapa.height); // limpiar mapa
    lienzo.drawImage( //dibujar imagen de fondo
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    /*lienzo.drawImage( //arrastrar valores del personaje
        personajeJugadorObjeto.mapaFoto, 
        personajeJugadorObjeto.x,
        personajeJugadorObjeto.y,
        personajeJugadorObjeto.ancho,
        personajeJugadorObjeto.alto
    )*/
    //Pintar personajes por medio del metodo de clases
    personajeJugadorObjeto.pintarArquetipo();
    //funcion para enviar la posicion al back end
    enviarPosicion(personajeJugadorObjeto.x, personajeJugadorObjeto.y);
    /*hechiceraEnemigo.pintarArquetipo();
    doncellaEnemigo.pintarArquetipo();
    madreEnemigo.pintarArquetipo();*/
    //pintar enemigos
    arquetiposEnemigos.forEach(function(enemigo) { //por cada elemento del array
        if(enemigo != undefined) {
        enemigo.pintarArquetipo() //dibujar en el mapa
        revisarColision(enemigo); //revisar la colision con otros personajes
        }
    })

    //revisar la colision con otros personajes
   /* if(personajeJugadorObjeto.velocidadx != 0 || personajeJugadorObjeto.velocidady != 0){
        revisarColision(hechiceraEnemigo);
        revisarColision(doncellaEnemigo);
        revisarColision(madreEnemigo);
    }*/

}

//funcion para enviar las coordenadas del personaje al back end
function enviarPosicion(x, y) {
    fetch(`http://192.168.0.22:8080/cyclopon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ //coordenadas a enviar con la misma clave-valor
            x,
            y
        })
    })
    .then(function (res) { //esperar respuesta
        if(res.ok) { //verificar que fue enviada una respuesta
            res.json() //leer la respuesta
            .then(function({ enemigos }) { //en caso de que exista extraer la variable enemigos del paquete
                console.log(enemigos) //imprimir lista de enemigos

                //crear personajes enemigo
                arquetiposEnemigos = enemigos.map(function (enemigo) {
                    let arquetipoEnemigo = null; //variable general
                    if(enemigo.cyclopon != undefined) { //solo hacer si existe un enemigo
                        const arquetipoNombre = enemigo.cyclopon.nombre || ""//extraer el nombre

                    //verificar tipo de personaje y crearlo
                    if (arquetipoNombre === "Hechicera"){
                        arquetipoEnemigo = new Arquetipo ('Hechicera', './assets/hechicera.png', 5, './assets/hechiceraface.png', enemigo.id);
                    } else if (arquetipoNombre === "Doncella") {
                        arquetipoEnemigo = new Arquetipo ('Doncella', './assets/doncella.png', 5, './assets/docellaface.png', enemigo.id);
                    } else if (arquetipoNombre === "Madre") {
                        arquetipoEnemigo = new Arquetipo ('Madre', './assets/madre.png', 5, './assets/madreface.png', enemigo.id);
                    }

                    //pintar mokepon enemigo en el ma
                    arquetipoEnemigo.x = enemigo.x;
                    arquetipoEnemigo.y = enemigo.y;
                    //arquetipoEnemigo.pintarArquetipo()
                    }
                    
                    return arquetipoEnemigo;
                })

            })
        }
    })
}

/*function moverPersonaje() { //funcion que activa en boton
    madre.x = madre.x + 5; //actualizar posicion en x
    //madre.y = madre.y + 5;
    PintarPersonaje() //llamar funcion para insertar la imagen
}*/

function moverArriba() {
    personajeJugadorObjeto.velocidady = -5;
}
function moverAbajo() {
    personajeJugadorObjeto.velocidady = 5;
}
function moverDerecha() {
    personajeJugadorObjeto.velocidadx = 5;
}
function moverIzquierda() {
    personajeJugadorObjeto.velocidadx = -5;
}
function detenerMovimiento() {
    //enviar las velociadades a cero en ambas direcciones
    personajeJugadorObjeto.velocidady = 0;
    personajeJugadorObjeto.velocidadx = 0;
}

//Movimiento con teclado
function sePresionoUnaTecla(event) { //retornar evento
    switch (event.key) { //retorna el valor de la tecla
        case 'ArrowUp':
            moverArriba()            
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
        default:
            break;
    }
}

//Identificar al personaje seleccionado
function obtenerObjetoPersonaje() {
    for (let i = 0; i < arquetipos.length; i++){ //iterar en el arreglo de arquetipos
        if (arquetipoJugador == arquetipos[i].nombre){ // obtener el valor del personaje en el arreglo
            return arquetipos[i]; //regresa el objeto del personaje seleccionado
        }
    }
}

//Funcion para iniciar canva
function iniciarMapa() {
    //probar que el lienzo funciona
    //lienzo.fillRect(5,15,20,40); //dibujar rectangulo (posicion,tamaño)
    //let imagenDeMadre = new Image(); //crear una nueva imagen
    //imagenDeMadre.src = madre.foto; //indicar direccion de la imagen
    /*lienzo.drawImage( //insertar imagen en el lienzo, (imagen, posicion, tamaño)
    imagenDeMadre,20,40, 100,100)*/
    
    //definir tamaño del mapa
    //mapa.width = 320;
    //mapa.height = 240;

    //obtener al personaje personalizado
    personajeJugadorObjeto = obtenerObjetoPersonaje(arquetipoJugador);

    intervalo = setInterval(PintarCanvas, 50); //intervalo de 50ms para dibujar

    //Mover al personaje con el teclado
    window.addEventListener('keydown', sePresionoUnaTecla); //escuchar teclado
    window.addEventListener('keyup', detenerMovimiento); 
}

//colisiones en el mapa
function revisarColision(enemigo) {
    //definir limite de la imagen de cada enemigo
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;
    //definir limite de la imagen del personaje seleccionado
    const arribaPersonaje = personajeJugadorObjeto.y;
    const abajoPersonaje = personajeJugadorObjeto.y + personajeJugadorObjeto.alto;
    const derechaPersonaje = personajeJugadorObjeto.x + personajeJugadorObjeto.ancho;
    const izquierdaPersonaje = personajeJugadorObjeto.x;

    //condiciones de choque
    if(
        abajoPersonaje < arribaEnemigo || arribaPersonaje > abajoEnemigo || derechaPersonaje < izquierdaEnemigo || izquierdaPersonaje > derechaEnemigo
     ){
        return; //no hay colision
    }
    //si hay colision
    detenerMovimiento(); //prohibir el movimiento
    //alert("hay colision con " + enemigo.nombre); //notificar personaizado
    //identificar al enemigo
    enemigoId = enemigo.id;
    //cambiar vista
    sectionVerMapa.style.display = 'none';
    sectionAtaque.style.display = 'flex'; //mostrar seccion ataque
    //detener intervalo del refresco del mapa
    clearInterval(intervalo);
    seleccionarPersonajeEnemigo(enemigo)

}

//cargar html antes de ejecutar js
window.addEventListener('load', iniciarJuego);

