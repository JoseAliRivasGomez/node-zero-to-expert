const {request, response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const getUsers = async (req = request, res = response) => {

    try {

        const usuarioLogeado = req.usuario;
        
        const {desde = '0', limite = '10'} = req.query;
        const query = {estado: true};

        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
            .skip(Number(desde))                        
            .limit(Number(limite))
        ]);

        res.json({
            total,
            usuarios,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const createUser = async (req = request, res = response) => {

    try {
        
        const { email, password, nombre, rol } = req.body;

        const usuario = new Usuario( { email, password, nombre, rol } );

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();
        
        const token = await generarJWT( usuario.id );
        
        res.status(201).json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const login = async (req = request, res = response) => {

    try {

        const { email, password } = req.body;
        
        const usuario = await Usuario.findOne({email});

        if (!usuario || !usuario.estado){
            return res.status(400).json({
                msg: 'Credenciales invalidos',
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Credenciales invalidos',
            });
        }
        
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async (req = request, res = response) => {
    
    const {id_token} = req.body;

    try {

        const {nombre, img, email} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({email});

        if (!usuario){
            
            const data = {
                nombre,
                email,
                password: ':P',
                img,
                google: true,
                rol: 'USER'
            };

            usuario = new Usuario(data);
            await usuario.save();

        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Sin autorizacion, usuario bloqueado',
            });
        }

        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'El Token no se pudo verificar'
        });
    }

}

const updateUser = async (req = request, res = response) => {
    
    try {

        const usuarioLogeado = req.usuario;

        const {id} = req.params;
        
        const { _id, google, password, correo, ...resto } = req.body;

        if(password){
            const salt = bcrypt.genSaltSync();
            resto.password = bcrypt.hashSync( password, salt );
        }

        const usuario = await Usuario.findByIdAndUpdate(id, resto, {new:true});
                
        res.json({
            usuario,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const deleteUser = async (req = request, res = response) => {

    try {

        const usuarioLogeado = req.usuario;

        const {id} = req.params;

        const usuario = await Usuario.findByIdAndUpdate(id, {estado:false}, {new:true});
                
        res.json({
            usuario,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    getUsers,
    createUser,
    login,
    googleSignIn,
    updateUser,
    deleteUser,
}