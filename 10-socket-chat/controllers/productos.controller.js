const {request, response} = require('express');
const { isValidObjectId } = require('mongoose');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

const getProductos = async (req = request, res = response) => {

    try {

        const usuarioLogeado = req.usuario;
        
        const {desde = '0', limite = '10'} = req.query;
        const query = {estado: true};

        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
            .skip(Number(desde))                        
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
        ]);

        res.json({
            total,
            productos,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const getProducto = async (req = request, res = response) => {

    try {

        const usuarioLogeado = req.usuario;

        const {id} = req.params;
        
        const query = {id, estado: true};

        const producto = await Producto.findOne(query).populate('usuario', 'nombre').populate('categoria', 'nombre');

        res.json({
            producto
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const createProducto = async (req = request, res = response) => {

    try {
        
        const {estado, usuario, ...body} = req.body;

        const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });
        if ( productoDB ) {
            return res.status(400).json({
                msg: `El producto ${body.nombre.toUpperCase()} ya existe`,
            });
        }

        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id,
        }

        const producto = new Producto(data);

        await producto.save();
        
        res.status(201).json({
            producto,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const updateProducto = async (req = request, res = response) => {

    try {

        const usuarioLogeado = req.usuario;

        const {id} = req.params;
        
        const { _id, estado, usuario, ...data } = req.body;

        if(data.nombre){
            data.nombre = data.nombre.toUpperCase();
        }
        if(data.categoria){
            if(!isValidObjectId(data.categoria)){
                return res.status(400).json({
                    msg: 'No existe esa categoria'
                });
            }
            const existeCategoria = await Categoria.findById(data.categoria);
            if ( !existeCategoria ) {
                return res.status(400).json({
                    msg: 'No existe esa categoria'
                });
            }
        }
        data.usuario = req.usuario._id;

        const producto = await Producto.findByIdAndUpdate(id, data, {new:true});
                
        res.json({
            producto,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const deleteProducto = async (req = request, res = response) => {

    try {

        const usuarioLogeado = req.usuario;

        const {id} = req.params;

        const producto = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true});
                
        res.json({
            producto,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}




module.exports = {
    createProducto,
    getProductos,
    getProducto,
    updateProducto,
    deleteProducto,
}