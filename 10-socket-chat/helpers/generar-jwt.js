const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const generarJWT = (uid = '') => {
    
    return new Promise( (resolve, reject) => {

        const payload = {uid};

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (error, token) => {
            if (error){
                console.log(error);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })

    });

}

const comprobarJWT = async (token = '') => {
    try {
        if(token.length < 0){
            return null;
        }
        const {uid} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        const usuario = await Usuario.findById(uid);
        if(usuario && usuario.estado){
            return usuario;
        }else{
            return null
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}