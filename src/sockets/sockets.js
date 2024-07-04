const { io } = require("../index");

io.on('connection', client => {
    console.log("Cliente conectado");

    client.on('disconnect', () => {
        console.log("Cliente desconectado");
    });

    client.on('mensaje', (p) => {
        console.log("Mensaje !! " + p.nombre);
        io.emit("mensaje", { admin: "Nuevo Mensaje" });
    });
});
