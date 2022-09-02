const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {type: String, required: [true, 'El nombre es obligatorio'], unique: true},
    estado: {type: Boolean, default: true},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: true},
});

CategoriaSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object; 
});

module.exports = model('Categoria', CategoriaSchema);