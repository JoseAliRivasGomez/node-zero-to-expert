const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    rol: {type: String, required: [true, 'El rol es obligatorio']},
});

RoleSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object; 
});

module.exports = model('Role', RoleSchema);