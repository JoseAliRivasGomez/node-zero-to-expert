
const online = document.querySelector('#online');
const offline = document.querySelector('#offline');

const formulario = document.querySelector('#miFormulario');
const mensajes = document.querySelector("#misMensajes");
const mensaje = document.querySelector("#txtMensaje");

const socket = io();

socket.on('connect', () => {
    console.log('Conectado');
    online.style.display = '';
    offline.style.display = 'none';
})

socket.on('disconnect', () => {
    console.log('Desconectado');
    online.style.display = 'none';
    offline.style.display = '';
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nuevoMensaje = mensaje.value;

    socket.emit('mensaje-a-server', {msg: nuevoMensaje}, (id) => {
        console.log(id);
    });
});

socket.on('mensaje-de-server', (data) => {
    mensajes.innerHTML += `<li>${data.msg}</li>`;
});