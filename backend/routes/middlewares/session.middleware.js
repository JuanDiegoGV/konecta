const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const pool = require('../../utils/connection')
const CryptoJS = require('crypto-js')

dotenv.config()

const data = {
  message: ''
}

const verifyToken = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = CryptoJS.AES.decrypt(req.headers.authorization.split(' ')[1], process.env.AESTOKEN).toString(CryptoJS.enc.Utf8)
      jwt.verify(token, process.env.JWTSECRET, { complete: true }, (err, result) => {
        if (err) {
          console.error("ERROR: session.middleware verifyToken()", err)
          data.message = 'Invalid token'
          delete data.data
          data.error = true
          return res.status(400).send(data)
        } else {
          next()
        }
      })
    } catch (error) {
      console.error("ERROR: session.middleware verifyToken() trycatch", error)
      data.message = 'Invalid token'
      delete data.data
      data.error = true
      return res.status(401).send(data)
    }
  } else {
    data.message = 'No token provided'
    delete data.data
    data.error = true
    return res.status(400).send(data)
  }
}

const verifyScope = async (req, res, next) => {
  try {
    const token = jwt.decode(CryptoJS.AES.decrypt(req.headers.authorization.split(' ')[1], process.env.AESTOKEN).toString(CryptoJS.enc.Utf8))
    pool.query(`select * from "Administrador" where "ID_EMPLEADO" = ${token.id}`, async (error, results) => {
      if (error) {
        console.error("ERROR: session.middleware verifyScope()", error)
        data.message = 'Error obtaining user permission'
        data.error = true
        delete data.data
        return res.status(500).send(data)
      }
      if (results.rows.length > 0) {
        next()
      } else {
        data.message = 'User not allowed to execute the action'
        delete data.data
        data.error = true
        return res.status(401).send(data)
      }
    })
  } catch (error) {
    console.error("ERROR: session.middleware verifyScope() trycatch", error)
    return res.status(500)
  }
}

module.exports = { verifyToken, verifyScope }
