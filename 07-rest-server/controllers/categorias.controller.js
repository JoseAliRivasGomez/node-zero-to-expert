const {request, response} = require('express');
const Categoria = require('../models/categoria');

const getCategorias = async (req = request, res = response) => {

    try {

        const usuarioLogeado = req.usuario;
        
        const {desde = '0', limite = '10'} = req.query;
        const query = {estado: true};

        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
            .skip(Number(desde))                        
            .limit(Number(limite))
            .populate('usuario', 'nombre')
        ]);

        res.json({
            total,
            categorias,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const getCategoria = async (req = request, res = response) => {

    try {

        const usuarioLogeado = req.usuario;

        const {id} = req.params;
        
        const query = {id, estado: true};

        const categoria = await Categoria.findOne(query).populate('usuario', 'nombre');

        res.json({
            categoria
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const createCategoria = async (req = request, res = response) => {

    try {
        
        const nombre = req.body.nombre.toUpperCase();

        const categoriaDB = await Categoria.findOne({ nombre });
        if ( categoriaDB ) {
            return res.status(400).json({
                msg: `La categoria ${nombre} ya existe`,
            });
        }

        const data = {
            nombre,
            usuario: req.usuario._id
        }

        const categoria = new Categoria(data);

        await categoria.save();
        
        res.status(201).json({
            categoria,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const updateCategoria = async (req = request, res = response) => {

    try {

        const usuarioLogeado = req.usuario;

        const {id} = req.params;
        
        const { _id, estado, usuario, ...data } = req.body;

        data.nombre = data.nombre.toUpperCase();
        data.usuario = req.usuario._id;

        const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true});
                
        res.json({
            categoria,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const deleteCategoria = async (req = request, res = response) => {

    try {

        const usuarioLogeado = req.usuario;

        const {id} = req.params;

        const categoria = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true});
                
        res.json({
            categoria,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}




module.exports = {
    createCategoria,
    getCategorias,
    getCategoria,
    updateCategoria,
    deleteCategoria,
}