const TicketList = require("../models/ticket-list");

const ticketControl = new TicketList();

const socketController = (socket) => {
    
    //console.log('Cliente conectado', socket.id );

    // socket.on('disconnect', () => {
    //     console.log('Cliente desconectado', socket.id );
    // });

    socket.emit('ultimo-ticket', ticketControl.ultimoNumero);
    socket.emit('estado-actual', ticketControl.asignados);
    socket.emit('tickets-pendientes', ticketControl.pendientes.length);

    socket.on('siguiente-ticket', ( payload, callback ) => {

        const siguiente = ticketControl.siguienteNumero();

        socket.broadcast.emit('tickets-pendientes', ticketControl.pendientes.length);
        
        callback( siguiente );

    })

    socket.on('atender-ticket', ( {escritorio}, callback ) => {

        if(!escritorio){
            return callback({
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.asignarTicket(escritorio);

        socket.emit('tickets-pendientes', ticketControl.pendientes.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.pendientes.length);

        if(!ticket){
            callback({
                msg: 'No hay tickets pendientes'
            })
        }else{
            socket.broadcast.emit('estado-actual', ticketControl.asignados);
            callback({
                ticket
            })
        }
        
    })

}



module.exports = {
    socketController
}

