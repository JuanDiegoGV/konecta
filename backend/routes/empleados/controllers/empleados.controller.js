const pool = require('../../../utils/connection')

const data = {
  message: ''
}

const gets = async (req, res) => {
  const { page, perPage, fechaIngreso, nombre, salario } = req.query

  const options = []
  let offset = -1

  if (page) offset = page * (perPage || 10)
  if (fechaIngreso) options.push(`"Empleado"."FECHA_INGRESO" = '${fechaIngreso}'::date`)
  if (nombre) options.push(`"Empleado"."NOMBRE" ilike '%${nombre}%'`)
  if (salario) options.push(`"Empleado"."SALARIO" = ${salario}`)

  let query = 'select "ID", "FECHA_INGRESO", "NOMBRE", "SALARIO" from "Empleado"'
  let count = 'select count("ID") from "Empleado"'
  if (options.length > 0) {
    query += ' where ' + options.join(' and ')
    count += ' where ' + options.join(' and ')
  }
  if (offset >= 0) query += ' offset ' + offset + ' limit ' + (perPage || 10)


  try {
    pool.query(query + ';' + count, async (error, results) => {
      if (error) {
        console.error("ERROR: empleados.controller gets()", error)
        data.message = 'Error getting Empleados'
        data.error = true
        delete data.data
        return res.status(500).send(data)
      }
      if (results[0].rows.length > 0) {
        data.message = 'Empleados obtained'
        if (offset >= 0) data.totalPages = Math.ceil(parseInt(results[1].rows[0].count) / (perPage || 10))
        data.data = results[0].rows
        delete data.error
        return res.status(200).send(data)
      } else {
        data.message = 'No Empleados with the specified data'
        delete data.data
        data.error = true
        return res.status(200).send(data)
      }
    })
  } catch (error) {
    console.error("ERROR: empleados.controller gets() trycatch", error)
    return res.status(500)
  }
}

const get = async (req, res) => {
  const { id } = req.params
  try {
    pool.query(`select "ID", "FECHA_INGRESO", "NOMBRE", "SALARIO" from "Empleado" where "Empleado"."ID" = ${id}`,
      async (error, results) => {
        if (error) {
          console.error("ERROR: empleados.controller get()", error)
          data.message = 'Error getting Empleado'
          data.error = true
          delete data.data
          return res.status(500).send(data)
        }
        if (results.rows.length > 0) {
          data.message = 'Empleado obtained'
          data.data = results.rows[0]
          delete data.error
          return res.status(200).send(data)
        } else {
          data.message = 'Empleado not exists'
          data.error = true
          delete data.data
          return res.status(200).send(data)
        }
      }
    )
  } catch (error) {
    console.error("ERROR: empleados.controller get() trycatch", error)
    return res.status(500)
  }
}

const post = async (req, res) => {
  const { fechaIngreso, nombre, salario } = req.body
  try {
    pool.query(`insert into "Empleado" ("FECHA_INGRESO", "NOMBRE", "SALARIO") values ('${fechaIngreso}'::date, '${nombre}', ${salario}) returning "ID"`,
      async (error, results) => {
        if (error) {
          console.error("ERROR: empleados.controller post()", error)
          data.message = 'Error creating Empleado'
          data.error = true
          delete data.data
          return res.status(500).send(data)
        } else {
          data.message = 'Empleado created'
          data.data = {
            id: results.rows[0].ID
          }
          delete data.error
          return res.status(201).send(data)
        }
      }
    )
  } catch (error) {
    console.error("ERROR: empleados.controller post() trycatch", error)
    return res.status(500)
  }
}

module.exports = {
  gets,
  get,
  post
}
