const pool = require('../../../utils/connection')
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')

const data = {
  message: ''
}

const post = async (req, res) => {
  const { id, password } = req.body

  try {
    pool.query(`select "Empleado"."ID", "Empleado"."NOMBRE", "Administrador"."ID" as "ID_ADMIN" from "Empleado" left join "Administrador" on "Empleado"."ID" = "Administrador"."ID_EMPLEADO" where "Empleado"."ID" = ${id} and "Empleado"."CONTRASENA" = '${password}'`, async (error, results) => {
      if (error) {
        console.error("ERROR: session.controller post()", error)
        data.message = 'Error getting user'
        data.error = true
        delete data.data
        return res.status(500).send(data)
      }
      if (results.rows.length > 0) {
        const user = results.rows[0]
        var token = jwt.sign({
          id: user.ID,
          name: user.NOMBRE,
          admin: user.ID_ADMIN ? true : false,
        }, process.env.JWTSECRET, { expiresIn: '7d' });
        data.message = 'User obtained'
        data.data = {
          id: user.ID,
          name: user.NOMBRE,
          admin: user.ID_ADMIN ? true : false,
          token: CryptoJS.AES.encrypt(token, process.env.AESTOKEN).toString()
        }
        delete data.error
        return res.status(200).send(data)
      } else {
        data.message = 'Credentials wrong'
        delete data.data
        data.error = true
        return res.status(400).send(data)
      }
    })
  } catch (error) {
    console.error("ERROR: session.controller post() trycatch", error)
    return res.status(500)
  }
}

module.exports = {
  post
}
