//console.log("Hola Node")
const express = require("express") //importar libreria
const cors = require("cors") //libreria para acceso

const app = express() //crear servidor replicando la libreria

app.use(express.static('public')) //servir archivos estaticos/construir el front end

app.use(cors()) //indicar que utilice la libreria

app.use(express.json()) //habilitar peticiones tipo post con paquetes de datos json

const jugadores = [] //array para guardar jugadores

//objeto jugador
class Jugador {
    constructor (id) {
        this.id = id
    }

    //metodo agregar su mascota
    asignarArquetipo (cyclopon) {
        this.cyclopon = cyclopon
    }

    //metodo agregar coordenadas
    actualizarPosicion (x,y) {
        this.x = x
        this.y = y 
    }

    //metodo agregar ataques
    asignarAtaques(ataques){
        this.ataques = ataques
    }
}
//objeto arquetipo
class Arquetipo {
    constructor (nombre) {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}` //id al azar

    const jugador = new Jugador(id) //crear un nuevo jugador

    jugadores.push(jugador) //añadir jugador a la lista de jugadores

    //res.setHeader("Access-Control-Allow-Origin", "*") //recibir peticiones de cualquier origen

    res.send(id) //enviar respuesta
    //res.send("Hola") //enviar respuesta
}) //responder a las peticiones

app.post("/cyclopon/:jugadorId", (req, res) => { //peticion tipo post 
    const jugadorId = req.params.jugadorId || "" //acceder a la url datos del petidor
    const nombre = req.body.cyclopon || "" //obtener nombre del personaje
    const cyclopon = new Arquetipo(nombre) //crear objeto arquetipo

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id) //buscar el indice del jugador 
    if(jugadorIndex >= 0) { //si el jugador existe
        jugadores[jugadorIndex].asignarArquetipo(cyclopon) //asignamos personaje al jugador
    }

    console.log(jugadores) //imprimir lista de jugadores
    console.log(jugadorId) //imprimir quien realizo el envio
    res.end() //terminar peticion
})

app.post("/cyclopon/:jugadorId/posicion", (req, res) => { //peticion de las coordenadas del jugador
    const jugadorId = req.params.jugadorId || "" // que jugador realiza la peticion
    const x = req.body.x || 0 //obtener posicion x
    const y = req.body.y || 0 //obtener psocion y

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id) //buscar el indice del jugador 
    if(jugadorIndex >= 0) { //si el jugador existe
        jugadores[jugadorIndex].actualizarPosicion(x, y) //asignar coordenadas
    }

    //lista de enemigos
    const enemigos = jugadores.filter((jugador) => jugadorId != jugador.id) //filtrar a cada jugador de la array jugadores, que sea diferente del jugador actual

    res.send({
        enemigos
    }) //devolver json de la peticion
})

app.post("/cyclopon/:jugadorId/ataques", (req, res) => { //peticion de las coordenadas del jugador
    const jugadorId = req.params.jugadorId || "" // que jugador realiza la peticion
    const ataques = req.body.ataques || [] //lista de ataques

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id) //buscar el indice del jugador 
    if(jugadorIndex >= 0) { //si el jugador existe
        jugadores[jugadorIndex].asignarAtaques(ataques) //asignar ataques del jugador
    }
    res.end()
})

app.get("/cyclopon/:jugadorId/ataques", (req, res) => { //peticion de los ataques enemigos
    const jugadorId = req.params.jugadorId || "" // que jugador realiza la peticion
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId) //encontra al enemigo
    res.send({ //enviar un json con los ataques
        ataques: jugador.ataques || [] 
    })
})

app.listen(8080, () => {
    console.log("Servidor funcionando")
}) //activar escucha del servidor