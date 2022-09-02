
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnEnviar  = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnEnviar.disabled = false;
});

socket.on('disconnect', () => {
    btnEnviar.disabled = true;
});

socket.on('ultimo-ticket', (ultimo) => {
    lblNuevoTicket.innerText = ultimo;
});

btnEnviar.addEventListener( 'click', () => {
    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});