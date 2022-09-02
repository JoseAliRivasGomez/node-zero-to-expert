const {Router} = require('express');
const { check }  = require('express-validator');
const { cargarArchivo, actualizarImagen, getImagen, actualizarImagenCloudinary } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const { validarCampos, validarJWT, validarArchivoSubir } = require('../middlewares');

const router = Router();

router.post('/', [
    validarJWT,
    validarArchivoSubir,
], cargarArchivo);

router.put('/:coleccion/:id', [
    validarJWT,
    validarArchivoSubir,
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    check('id', 'El ID no es valido').isMongoId(),
    validarCampos
], actualizarImagenCloudinary);

router.get('/:coleccion/:id', [
    validarJWT,
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    check('id', 'El ID no es valido').isMongoId(),
    validarCampos
], getImagen);

module.exports = router;