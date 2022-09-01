const {Router} = require('express');
const { check }  = require('express-validator');

const { getUsers, createUser, updateUser, deleteUser, login, googleSignIn } = require('../controllers/users.controller');
const { esRolValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRole, tieneRol } = require('../middlewares');

const router = Router();

router.get('/', [
    validarJWT,
    //esAdminRole,
    tieneRol('ADMIN'),
], getUsers);

router.post('/signup', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de 8 caracteres minimo').isLength({min: 8}),
    check('email', 'El email no es valido').isEmail(),
    check('email').custom(emailExiste),
    //check('rol', 'El rol no es valido').isIn(['ADMIN', 'USER']),
    check('rol').custom(esRolValido),
    validarCampos
], createUser);

router.post('/login', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

router.put('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRol('ADMIN'),
    check('id', 'El ID del usuario no es valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRolValido),
    validarCampos
], updateUser);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRol('ADMIN'),
    check('id', 'El ID del usuario no es valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], deleteUser);

module.exports = router;