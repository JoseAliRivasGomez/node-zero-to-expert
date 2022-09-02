
const miForm = document.querySelector('form');

const url = (window.location.hostname.includes('localhost'))
? 'http://localhost:4000/api/auth/'
: 'https://cafe-app-2177.herokuapp.com/api/auth/'

miForm.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = {};

    for(let el of miForm.elements){
        if(el.name.length > 0){
            formData[el.name] = el.value;
        }
    }

    //console.log(formData);

    fetch(url + 'login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(({msg, token}) => {
        if(msg){
            return console.error(msg);
        }
        localStorage.setItem('token', token)
        window.location = 'chat.html';
    })
    .catch(console.warn)
});

function handleCredentialResponse(response) {

    const body = {id_token: response.credential};
    fetch(url + 'google', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(resp => {
        localStorage.setItem('email', resp.usuario.email)
        localStorage.setItem('token', resp.token)
        console.log(resp);
        window.location = 'chat.html';
    })
    .catch(console.warn)

}

const button = document.getElementById('google_signout');
button.onclick = () => {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    })
}