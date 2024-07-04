const express = require("express");
const path = require("path");
require("dotenv").config();

// App de Express
const app = express();

// Node SERVER
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

// Cargar configuración de sockets
require("./sockets/sockets");

// Path público
const publicPath = path.join(__dirname, "../public");

// Middleware para servir archivos estáticos
app.use(express.static(publicPath));

// Iniciar el servidor
const port = process.env.PORT || 3000;
server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log("Servidor corriendo en el puerto " + port);
});
