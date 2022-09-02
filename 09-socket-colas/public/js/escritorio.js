const lblEscritorio  = document.querySelector('h1');
const lblTicket  = document.querySelector('small');
const alerta  = document.querySelector('.alert');
const btnEnviar  = document.querySelector('button');
const lblPendientes  = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = 'Escritorio ' + escritorio;

alerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnEnviar.disabled = false;
});

socket.on('disconnect', () => {
    btnEnviar.disabled = true;
});

socket.on('tickets-pendientes', (tickets) => {
    if(tickets){
        lblPendientes.innerText = tickets;
    }else{
        lblPendientes.innerText = 0;
    }
});

btnEnviar.addEventListener( 'click', () => {
    
    socket.emit( 'atender-ticket', {escritorio}, ( {ticket, msg = ''} ) => {
        if(!ticket){
            lblTicket.innerText = '...';
            return alerta.style.display = '';
        }
        alerta.style.display = 'none';
        lblTicket.innerText = ticket.numero;
    });

});