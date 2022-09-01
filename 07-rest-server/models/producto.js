const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre: {type: String, required: [true, 'El nombre es obligatorio'], unique: true},
    estado: {type: Boolean, default: true},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: true},
    categoria: {type: Schema.Types.ObjectId, ref: 'Categoria', required: true},
    precio: {type: Number, default: 0},
    descripcion: {type: String},
    disponible: {type: Boolean, default: true},
    img: {type: String},
});

ProductoSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object; 
});

module.exports = model('Producto', ProductoSchema);