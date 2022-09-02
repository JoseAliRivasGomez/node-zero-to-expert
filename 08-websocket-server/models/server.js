const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');
const Sockets = require('./sockets');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            
        }

        this.server = http.createServer(this.app)

        this.io = socketIO(this.server, {cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"]
          }});

        this.middlewares();
        this.routes();
        this.configurarSockets();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    routes() {


        this.app.get('*', (req, res) => {
            //console.log(__dirname.substring(0, __dirname.length-7));
            res.sendFile( __dirname.substring(0, __dirname.length-7) + '/public/index.html'); //sin /src
        })
    }

    configurarSockets(){
        new Sockets(this.io);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Socket Server listening on port ${this.port}`)
        });
    }

}

module.exports = Server;