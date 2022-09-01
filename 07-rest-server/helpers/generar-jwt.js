const jwt = require('jsonwebtoken');

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

module.exports = {
    generarJWT
}