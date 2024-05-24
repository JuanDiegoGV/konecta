import endpoints from '../config/api'
import axios from 'axios'

export const GetSolicitudes = async (options = {}) => {

  let params = {}

  Object.keys(options).forEach(key => {
    if (options[key] !== null && options[key] !== '' && options[key] !== undefined) params[key] = options[key]
  })

  const data = await axios.request({
    url: endpoints.solicitud,
    params,
    headers: { Accept: '*/*', 'Content-Type': 'application/json', Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
  }).then(res => res.data).catch(err => {
    return Promise.reject(err)
  })

  return data
}

export const GetSolicitud = async (id) => await axios.request({
  url: endpoints.solicitud + '/' + id,
  headers: { Accept: '*/*', 'Content-Type': 'application/json', Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
}).then(res => res.data).catch(err => {
  return Promise.reject(err)
})


export const PostSolicitud = async (data) => await axios.request({
  method: 'POST',
  url: endpoints.solicitud,
  headers: { Accept: '*/*', 'Content-Type': 'application/json', Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` },
  data
}).then(res => res.data).catch(err => {
  return Promise.reject(err)
})

export const DeleteSolicitud = async (id) => await axios.request({
  method: 'DELETE',
  url: endpoints.solicitud + '/' + id,
  headers: { Accept: '*/*', 'Content-Type': 'application/json', Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
}).then(res => res.data).catch(err => {
  return Promise.reject(err)
})
