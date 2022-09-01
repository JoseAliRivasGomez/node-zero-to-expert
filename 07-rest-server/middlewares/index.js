
const a = require('../middlewares/validar-campos');
const b = require('../middlewares/validar-jwt');
const c = require('../middlewares/validar-roles');
const d = require('../middlewares/validar-archivo');

module.exports = {
    ...a,
    ...b,
    ...c,
    ...d,
}