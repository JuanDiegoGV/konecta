const { validationResult } = require('express-validator')

const validationBody = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, message: 'Error on data', data: errors.array() })
  } else {
    next()
  }
}

module.exports = { validationBody }
