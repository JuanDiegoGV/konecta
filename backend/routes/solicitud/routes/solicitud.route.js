const express = require('express')
const { gets, get, post, remove } = require('../controllers/solicitud.controller')
const { validationBody } = require('../../middlewares/validation.middleware')
const { verifyScope } = require('../../middlewares/session.middleware')
const { query, param, body } = require('express-validator')

const router = express.Router()

// get all solicitud
router.get('/',
  query('page')
    .notEmpty().withMessage('Param page is empty')
    .isNumeric().withMessage('Param page must be number')
    .optional()
    .escape()
    .trim()
  , query('perPage')
    .notEmpty().withMessage('Param perPage is empty')
    .isNumeric().withMessage('Param perPage must be number')
    .optional()
    .default(10)
    .escape()
    .trim()
  , query('codigo')
    .notEmpty().withMessage('Param codigo is empty')
    .isString().withMessage('Param codigo must be string')
    .optional()
    .escape()
    .trim()
  , query('descripcion')
    .notEmpty().withMessage('Param descripcion is empty')
    .isString().withMessage('Param descripcion must be string')
    .optional()
    .escape()
    .trim()
  , query('resumen')
    .notEmpty().withMessage('Param resumen is empty')
    .isString().withMessage('Param resumen must be string')
    .optional()
    .escape()
    .trim()
  , query('idEmpleado')
    .notEmpty().withMessage('Param idEmpleado is empty')
    .isNumeric().withMessage('Param idEmpleado must be number')
    .optional()
    .escape()
    .trim()
  , validationBody, gets)

// get one solicitud
router.get('/:id',
  param('id')
    .exists().withMessage('Param id is required')
    .notEmpty().withMessage('Param id is empty')
    .escape()
    .trim(),
  validationBody, get)

// create solicitud
router.post('/', verifyScope,
  body('codigo')
    .exists().withMessage('Field codigo is required')
    .notEmpty().withMessage('Field codigo is empty')
    .isString().withMessage('Field codigo must be string')
    .escape()
    .trim(),
  body('descripcion')
    .exists().withMessage('Field descripcion is required')
    .notEmpty().withMessage('Field descripcion is empty')
    .isString().withMessage('Field descripcion must be string')
    .escape()
    .trim(),
  body('resumen')
    .exists().withMessage('Field resumen is required')
    .notEmpty().withMessage('Field resumen is empty')
    .isString().withMessage('Field resumen must be string')
    .escape()
    .trim(),
  body('idEmpleado')
    .exists().withMessage('Field idEmpleado is required')
    .notEmpty().withMessage('Field idEmpleado is empty')
    .isNumeric().withMessage('Field idEmpleado must be number')
    .escape()
    .trim(),
  validationBody, post)

// delete solicitud
router.delete('/:id', verifyScope,
  param('id')
    .exists().withMessage('El parametro id es requerido')
    .notEmpty().withMessage('El parametro id esta vacio')
    .escape()
    .trim(),
  validationBody, remove)

module.exports = router
