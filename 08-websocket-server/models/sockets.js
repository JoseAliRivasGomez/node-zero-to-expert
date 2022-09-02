

class Sockets {

    constructor(io){
        this.io = io;

        this.socketEvents();
    }

    socketEvents(){

        this.io.on('connection', (socket) => { 

            console.log('Cliente conectado', socket.id);

            socket.on('mensaje-a-server', (data, callback) => {
                console.log(data);

                const id = 12345678;
                callback(id);
        
                this.io.emit('mensaje-de-server', data); // or socket.broadcast (envia a los otros, pero a este no)
            });
        
            socket.on('disconnect', () => {
                console.log('Cliente desconectado', socket.id);
            })
        
            //console.log('Dispositivo cliente conectado');
            //console.log(socket.id);
        
            // socket.emit('mensaje-bienvenida', {
            //     msg: 'Bienvenido al servidor',
            //     fecha: new Date(),
            // });
        
            // socket.on('mensaje-cliente', (data) => {
            //     console.log(data);
            // });
        
        
        
        });

    }

}

module.exports = Sockets;