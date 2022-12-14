const express = require('express');
const path = require('path');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
const http = require('http');
const socketIO = require('socket.io');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.server = http.createServer(this.app)

        this.io = socketIO(this.server, {cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"]
          }});

        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
        }
        this.conectarDB();
        this.middlewares();
        this.routes();
        this.sockets();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/users.routes'));
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'));
        this.app.use(this.paths.productos, require('../routes/productos.routes'));
        this.app.use(this.paths.buscar, require('../routes/buscar.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
        this.app.get('*', (req, res) => {
            //console.log(__dirname.substring(0, __dirname.length-7));
            res.sendFile( __dirname.substring(0, __dirname.length-7) + '/public/index.html'); //sin /src
        })
    }

    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io) );
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`REST Server listening on port ${this.port}`)
        });
    }

}

module.exports = Server;