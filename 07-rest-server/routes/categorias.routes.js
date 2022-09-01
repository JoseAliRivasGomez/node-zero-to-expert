const {Router} = require('express');
const { check }  = require('express-validator');
const { createCategoria, getCategorias, getCategoria, updateCategoria, deleteCategoria } = require('../controllers/categorias.controller');

const { existeCategoriaPorID } = require('../helpers/db-validators');
const { validarCampos, validarJWT, tieneRol } = require('../middlewares');

const router = Router();

router.get('/', [
    validarJWT,
], getCategorias);

router.get('/:id', [
    validarJWT,
    check('id', 'El ID de la categoria no es valido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], getCategoria);

router.post('/', [
    validarJWT,
    tieneRol('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createCategoria);

router.put('/:id', [
    validarJWT,
    tieneRol('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'El ID de la categoria no es valido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], updateCategoria);

router.delete('/:id', [
    validarJWT,
    tieneRol('ADMIN'),
    check('id', 'El ID de la categoria no es valido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], deleteCategoria);

module.exports = router;