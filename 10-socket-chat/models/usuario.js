const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {type: String, required: [true, 'El nombre es obligatorio']},
    email: {type: String, required: [true, 'El correo es obligatorio'], unique: true},
    password: {type: String, required: [true, 'La contraseña es obligatoria']},
    img: {type: String},
    rol: {type: String, required: [true, 'El rol es obligatorio'], enum: ['ADMIN', 'USER']},
    estado: {type: Boolean, default: true},
    google: {type: Boolean, default: false},
});

UsuarioSchema.method('toJSON', function () {
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object; 
});

module.exports = model('Usuario', UsuarioSchema);