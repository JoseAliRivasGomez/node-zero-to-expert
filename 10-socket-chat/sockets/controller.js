const { comprobarJWT } = require("../helpers/generar-jwt");
const ChatMensajes = require("../models/chat-mensajes");

const chatMensajes = new ChatMensajes();

const socketController = async (socket, io) => {
    
    //console.log('Cliente conectado', socket.id );

    // socket.on('disconnect', () => {
    //     console.log('Cliente desconectado', socket.id );
    // });

    const usuario = await comprobarJWT(socket.handshake.headers['x-token']);

    if(!usuario){
        console.log('Socket no identificado');
        return socket.disconnect();
    }

    console.log(`Usuario conectado: ${usuario.nombre}`);

    chatMensajes.conectarUsuario(usuario);
    io.emit('usuarios-activos', chatMensajes.usuariosArr);
    socket.emit('recibir-mensajes', chatMensajes.ultimos10);

    socket.join(usuario.id); //Se una a una sala de socket.io

    socket.on('enviar-mensaje', ({uid, mensaje}) => {
        if(uid){
            socket.to(uid).emit('mensaje-privado', {de: usuario.nombre, mensaje});
        }else{
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje);
            io.emit('recibir-mensajes', chatMensajes.ultimos10);
        }
        
    });

    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id);
        io.emit('usuarios-activos', chatMensajes.usuariosArr);
    });

}



module.exports = {
    socketController
}

