const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {

    const existeRol = await Role.findOne({rol});
    console.log(existeRol);
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const emailExiste = async (email = '') => {
    
    const existeEmail = await Usuario.findOne({ email });
    if ( existeEmail ) {
        throw new Error(`El email ${email} ya esta registrado en la base de datos`);
    }
}

const existeUsuarioPorID = async (id = '') => {
    
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El ID ${id} no existe`);
    }
}

const existeCategoriaPorID = async (id = '') => {
    
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El ID ${id} no existe`);
    }
}

const existeProductoPorID = async (id = '') => {
    
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El ID ${id} no existe`);
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    if(!colecciones.includes(coleccion)){
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorID,
    existeCategoriaPorID,
    existeProductoPorID,
    coleccionesPermitidas,
}