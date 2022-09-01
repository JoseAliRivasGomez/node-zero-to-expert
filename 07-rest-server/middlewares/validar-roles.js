const {response} = require('express');

const esAdminRole = (req, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN'){
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });
    }

    next();
    
}

const tieneRol = (...roles) => {

    return (req, res = response, next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `Este servicio require uno de estos roles: ${roles}`
            });
        }

        next();
    }
    
}

module.exports = {
    esAdminRole,
    tieneRol
}