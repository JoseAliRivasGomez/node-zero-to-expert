import express, {Application} from 'express';
import UserRoutes from '../routes/usuario.routes';
import cors from 'cors';
import path from 'path';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {

        this.app = express();
        this.port = process.env.PORT || '4000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            
            await db.authenticate();
            console.log('DB online');
            

        } catch (error) {
            throw new Error(error as any);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, UserRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ' + this.port);
            
        })
    }

}

export default Server;