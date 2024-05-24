import endpoints from '../config/api'
import axios from 'axios'

export const GetEmpleados = async (options) => {

  let params = {}

  Object.keys(options).forEach(key => {
    if (options[key] !== null && options[key] !== '' && options[key] !== undefined) params[key] = options[key]
  })

  const data = await axios.request({
    url: endpoints.empleado,
    params,
    headers: { Accept: '*/*', 'Content-Type': 'application/json', Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
  }).then(res => res.data).catch(err => {
    return Promise.reject(err)
  })

  return data
}

export const GetEmpleado = async (id) => await axios.request({
  url: endpoints.empleado + '/' + id,
  headers: { Accept: '*/*', 'Content-Type': 'application/json', Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
}).then(res => res.data).catch(err => {
  return Promise.reject(err)
})

export const PostEmpleado = async (data) => await axios.request({
  method: 'POST',
  url: endpoints.empleado,
  headers: { Accept: '*/*', 'Content-Type': 'application/json', Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` },
  data
}).then(res => res.data).catch(err => {
  return Promise.reject(err)
})
