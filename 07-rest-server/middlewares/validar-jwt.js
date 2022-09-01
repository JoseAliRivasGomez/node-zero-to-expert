const {response} = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRET_JWT_SEED);

        const usuario = await Usuario.findById(uid);

        if (!usuario || !usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido'
            });
        }

        req.usuario = usuario;

        next();
        
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
}

module.exports = {
    validarJWT
}