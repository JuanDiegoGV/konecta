const express = require('express')
const router = express.Router()

router.use('/', require('./routes/session.route'))

module.exports = router
