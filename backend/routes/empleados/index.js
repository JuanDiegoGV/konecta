const express = require('express')
const router = express.Router()

router.use('/', require('./routes/empleados.route'))

module.exports = router
