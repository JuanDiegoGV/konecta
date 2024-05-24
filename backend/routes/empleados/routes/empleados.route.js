const express = require('express')
const { gets, get, post } = require('../controllers/empleados.controller')
const { validationBody } = require('../../middlewares/validation.middleware')
const { verifyScope } = require('../../middlewares/session.middleware')
const { query, param, body } = require('express-validator')

const router = express.Router()

// get all empleados
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
  , query('fechaIngreso')
    .notEmpty().withMessage('Param fechaIngreso is empty')
    .isDate().withMessage('Param fechaIngreso must be date')
    .optional()
    .escape()
    .trim()
  , query('nombre')
    .notEmpty().withMessage('Param nombre is empty')
    .isString().withMessage('Param nombre must be string')
    .optional()
    .escape()
    .trim()
  , query('salario')
    .notEmpty().withMessage('Param salario is empty')
    .isNumeric().withMessage('Param salario must be number')
    .optional()
    .escape()
    .trim()
  , validationBody, gets)

// get one empleado
router.get('/:id',
  param('id')
    .exists().withMessage('Param id is required')
    .notEmpty().withMessage('Param id is empty')
    .escape()
    .trim(),
  validationBody, get)

// create empleado
router.post('/', verifyScope,
  body('fechaIngreso')
    .exists().withMessage('Field fechaIngreso is required')
    .notEmpty().withMessage('Field fechaIngreso is empty')
    .isDate().withMessage('Field fechaIngreso must be date')
    .escape()
    .trim(),
  body('nombre')
    .exists().withMessage('Field nombre is required')
    .notEmpty().withMessage('Field nombre is empty')
    .isString().withMessage('Field nombre must be string')
    .escape()
    .trim(),
  body('salario')
    .exists().withMessage('Field salario is required')
    .notEmpty().withMessage('Field salario is empty')
    .isNumeric().withMessage('Field salario must be number')
    .escape()
    .trim(),
  validationBody, post)

module.exports = router
