const Band = require("../../models/band");
const Bands = require("../../models/bands");
const { io } = require("../index");
const bands = new Bands();
console.log('nit server');
bands.addBand(new Band("queen"))
bands.addBand(new Band("Mago de Oz"))
bands.addBand(new Band("Metalica"))
bands.addBand(new Band("los bitles"))
console.log(bands)

io.on('connection', client => {
    console.log("Cliente conectado");
    client.emit('active-bands', bands.getBans())
    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });

    client.on('mensaje', (p) => {
        console.log("Mensaje !! " + p.nombre);
        io.emit("mensaje", { admin: "Nuevo Mensaje" });
    });
    client.on('emitir-mensaje', (p) => {
      client.broadcast('nuevo-mensaje', p )
    });
    client.on('vote-band', (p) => {
        bands.voteBand(p.id);
        io.emit('active-bands', bands.getBans())
      });
    client.on('add-band', (p) => {
        const NewBand = new Band(p.name)
        bands.addBand(NewBand);
        io.emit('active-bands', bands.getBans())
        });
});
