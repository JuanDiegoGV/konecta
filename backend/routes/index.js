const express = require('express')
const router = express.Router()
const { verifyToken } = require('./middlewares/session.middleware')

// Session
router.use('/session', require('./session/index'))

// Empleados
router.use('/empleados', verifyToken, require('./empleados/index'))

// Solicitud
router.use('/solicitud', verifyToken, require('./solicitud/index'))

module.exports = router
