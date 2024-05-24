const pool = require('../../../utils/connection')

const data = {
  message: ''
}

const gets = async (req, res) => {
  const { page, perPage, codigo, descripcion, resumen, idEmpleado } = req.query

  const options = []
  let offset = -1

  if (page) offset = page * (perPage || 10)
  if (codigo) options.push(`"Solicitud"."CODIGO" = '${codigo}'`)
  if (descripcion) options.push(`"Solicitud"."DESCRIPCION" ilike '%${descripcion}%'`)
  if (resumen) options.push(`"Solicitud"."RESUMEN" ILIKE '%${resumen}%'`)
  if (idEmpleado) options.push(`"Solicitud"."ID_EMPLEADO" = ${idEmpleado}`)

  let query = 'select * from "Solicitud"'
  let count = 'select count("ID") from "Solicitud"'
  if (options.length > 0) {
    query += ' where ' + options.join(' and ')
    count += ' where ' + options.join(' and ')
  }
  if (offset >= 0) query += ' offset ' + offset + ' limit ' + (perPage || 10)

  try {
    pool.query(query + ';' + count, async (error, results) => {
      if (error) {
        console.error("ERROR: solicitud.controller gets()", error)
        data.message = 'Error getting Solicitud'
        data.error = true
        delete data.data
        return res.status(500).send(data)
      }
      if (results[0].rows.length > 0) {
        data.message = 'Solicitud obtained'
        if (offset >= 0) data.totalPages = Math.ceil(parseInt(results[1].rows[0].count) / (perPage || 10))
        data.data = results[0].rows
        delete data.error
        return res.status(200).send(data)
      } else {
        data.message = 'No Solicitud with the specified data'
        delete data.data
        data.error = true
        return res.status(200).send(data)
      }
    })
  } catch (error) {
    console.error("ERROR: solicitud.controller gets() trycatch", error)
    return res.status(500)
  }
}

const get = async (req, res) => {
  const { id } = req.params
  try {
    pool.query(`select * from "Solicitud" where "Solicitud"."ID" = ${id}`,
      async (error, results) => {
        if (error) {
          console.error("ERROR: solicitud.controller get()", error)
          data.message = 'Error getting Solicitud'
          data.error = true
          delete data.data
          return res.status(500).send(data)
        }
        if (results.rows.length > 0) {
          data.message = 'Solicitud obtained'
          data.data = results.rows[0]
          delete data.error
          return res.status(200).send(data)
        } else {
          data.message = 'Solicitud not exists'
          data.error = true
          delete data.data
          return res.status(200).send(data)
        }
      }
    )
  } catch (error) {
    console.error("ERROR: solicitud.controller get() trycatch", error)
    return res.status(500)
  }
}

const post = async (req, res) => {
  const { codigo, descripcion, resumen, idEmpleado } = req.body
  try {
    pool.query(`insert into "Solicitud" ("CODIGO", "DESCRIPCION", "RESUMEN", "ID_EMPLEADO") values ('${codigo}', '${descripcion}', '${resumen}', ${idEmpleado}) returning "ID"`,
      async (error, results) => {
        if (error) {
          console.error("ERROR: solicitud.controller post()", error)
          data.message = 'Error creating Solicitud'
          data.error = true
          delete data.data
          return res.status(500).send(data)
        } else {
          data.message = 'Solicitud created'
          data.data = {
            id: results.rows[0].ID
          }
          delete data.error
          return res.status(201).send(data)
        }
      }
    )
  } catch (error) {
    console.error("ERROR: solicitud.controller post() trycatch", error)
    return res.status(500)
  }
}

const remove = async (req, res) => {
  const { id } = req.params
  try {
    pool.query(`delete from "Solicitud" where "ID" = ${id}`,
      async (error, results) => {
        if (error) {
          console.error("ERROR: solicitud.controller remove()", error)
          data.message = 'Error deleting Solicitud'
          data.error = true
          delete data.data
          return res.status(500).send(data)
        } else {
          data.message = 'Solicitud deleted'
          data.data = results.rows[0]
          delete data.error
          return res.status(200).send(data)
        }
      }
    )
  } catch (error) {
    console.error("ERROR: solicitud.controller remove() trycatch", error)
    return res.status(500)
  }
}

module.exports = {
  gets,
  get,
  post,
  remove
}
