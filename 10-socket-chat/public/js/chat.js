
let usuario = null;
let socket = null;

const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');

const url = (window.location.hostname.includes('localhost'))
? 'http://localhost:4000/api/auth/'
: 'https://cafe-app-2177.herokuapp.com/api/auth/'

const validarJWT = async () => {
    
    const token = localStorage.getItem('token');

    if(token.length <= 10){
        window.location = 'index.html';
        throw new Error('No hay token');
    }

    const resp = await fetch(url + 'renew', {
        headers: {
            'x-token': token
        }
    });

    const {usuario: userDB, token: tokenDB} = await resp.json();
    //console.log(userDB, tokenDB);
    localStorage.setItem('token', tokenDB);
    usuario = userDB;
    document.title = usuario.nombre;

    await conectarSocket();
}

const conectarSocket = async () => {
    
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Sockets online');
    });

    socket.on('disconnect', () => {
        console.log('Sockets offline');
    });

    socket.on('recibir-mensajes', (mensajes) => {
        dibujarMensajes(mensajes);
    });

    socket.on('usuarios-activos', (usuarios) => {
        dibujarUsuarios(usuarios);
    });

    socket.on('mensaje-privado', (payload) => {
        console.log(payload);
    });

}

const dibujarUsuarios = (usuarios = []) => {
    let usersHtml = '';
    usuarios.forEach(({uid, nombre}) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${nombre}</h5>
                    <span class="fs-6 text-muted">${uid}</span>
                </p>
            </li>
        `;
    });
    ulUsuarios.innerHTML = usersHtml;
}

const dibujarMensajes = (mensajes = []) => {
    let mensajesHtml = '';
    mensajes.forEach(({mensaje, nombre}) => {
        mensajesHtml += `
            <li>
                <p>
                    <span class="text-primary">${nombre}:</span>
                    <span>${mensaje}</span>
                </p>
            </li>
        `;
    });
    ulMensajes.innerHTML = mensajesHtml;
}

txtMensaje.addEventListener('keyup', ({keyCode}) => {
    if(keyCode !== 13) return;

    const mensaje = txtMensaje.value;
    if(mensaje.length === 0) return;

    const uid = txtUid.value;

    socket.emit('enviar-mensaje', {mensaje, uid});

    txtMensaje.value = '';
});

const main = async () => {
    
    await validarJWT();

}

main();



