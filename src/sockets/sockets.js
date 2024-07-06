const Band = require("../../models/band");
const Bands = require("../../models/bands");
const { io } = require("../index");

const bands = new Bands();
console.log('nit server');
bands.addBand(new Band("queen"));
bands.addBand(new Band("Mago de Oz"));
bands.addBand(new Band("Metalica"));
bands.addBand(new Band("los bitles"));
console.log(bands);

io.on('connection', client => {
    console.log("Cliente conectado");
    client.emit('active-bands', bands.getBans());

    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });

    client.on('mensaje', (p) => {
        if (p && p.nombre) {
            console.log("Mensaje !! " + p.nombre);
            io.emit("mensaje", { admin: "Nuevo Mensaje" });
        } else {
            console.log("Mensaje recibido sin nombre");
        }
    });

    client.on('emitir-mensaje', (p) => {
        client.broadcast.emit('nuevo-mensaje', p);
    });

    client.on('vote-band', (p) => {
        if (p && p.id) {
            bands.voteBand(p.id);
            io.emit('active-bands', bands.getBans());
        } else {
            console.log("Vote received without id");
        }
    });

    client.on('add-band', (p) => {
        if (p && p.name) {
            const newBand = new Band(p.name);
            bands.addBand(newBand);
            io.emit('active-bands', bands.getBans());
        } else {
            console.log("Add band received without name");
        }
    });

    client.on('delete-band', (p) => {
        if (p && p.id) {
            bands.deleteBands(p.id);
            io.emit('active-bands', bands.getBans());
        } else {
            console.log("Delete band received without id");
        }
    });
});
