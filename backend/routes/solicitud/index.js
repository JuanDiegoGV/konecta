const express = require('express')
const router = express.Router()

router.use('/', require('./routes/solicitud.route'))

module.exports = router
