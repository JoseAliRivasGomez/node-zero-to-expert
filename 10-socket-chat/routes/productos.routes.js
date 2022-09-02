const {Router} = require('express');
const { check }  = require('express-validator');
const { getProductos, getProducto, createProducto, updateProducto, deleteProducto } = require('../controllers/productos.controller');

const { existeCategoriaPorID, existeProductoPorID } = require('../helpers/db-validators');
const { validarCampos, validarJWT, tieneRol } = require('../middlewares');

const router = Router();

router.get('/', [
    validarJWT,
], getProductos);

router.get('/:id', [
    validarJWT,
    check('id', 'El ID del producto no es valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], getProducto);

router.post('/', [
    validarJWT,
    tieneRol('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El ID de la categoria no es valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorID),
    validarCampos
], createProducto);

router.put('/:id', [
    validarJWT,
    tieneRol('ADMIN'),
    // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'El ID del producto no es valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    // check('categoria', 'El ID de la categoria no es valido').isMongoId(),
    // check('categoria').custom(existeCategoriaPorID),
    validarCampos
], updateProducto);

router.delete('/:id', [
    validarJWT,
    tieneRol('ADMIN'),
    check('id', 'El ID del producto no es valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], deleteProducto);

module.exports = router;