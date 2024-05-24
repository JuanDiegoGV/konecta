const app = require('../index')
const request = require('supertest')

const token = 'U2FsdGVkX19v7eMh8Cc0xNv2nv+oQmGXQIiW2YdDkTxid8FBfIvFNetCbLoXZtPUcugt6KrO4xbLHkRunfaqPI64lTxTT/JVGyLGu9OuENCEY2gyTg2fDpBJfJRzv4DpwDKpMnLUIRXibOdRLxc+D3rNmf/z/4M6gNooZ1dhffQvVd6fILAq25dc4/INmpepP/md0w9Ipwh4dfBeYYBVtF5bCfZXs8k8FuPioDkuXFLr8cLq2EX/2oTq829EhJko2AX4aK4hIUHVaFlpThfQBg=='

const badToken = 'U2FsdGVkX19v4545h7eMh8Cc0xNv2nv+oQmGXQIiW2YdDkTxid8FBfIvFNetCbLoXZtPUcugt6KrO4xbLHkRunfaqPI64lTxTT/JVGyLGu9OuENCEY2gyTg2fDpBJfJRzv4DpwDKpMnLUIXibOdRLxc+D3rNmf/z/4M6gNoZ1dhffQvVd6fILAq25dc4/INmpepP/md0w9Ipwh4dfBeYYBVtF5bCfZXs8k8FuPioDkuXFLr8cLq2EX/2oTq829EhJko2AX4aK4hIUHVaFlpThfQBg=='

// empleados
describe('empleados routes', () => {
  test('no token provided, should respond 400', async () => {
    const response = await request(app).get('/api/empleados').send()
    expect(response.statusCode).toBe(400)
  })
  test('no token provided, should respond 400', async () => {
    const response = await request(app).post('/api/empleados').send()
    expect(response.statusCode).toBe(400)
  })
  test('token provided, should respond 200', async () => {
    const response = await request(app).get('/api/empleados').set('Authorization', `Bearer ${token}`).send()
    expect(response.statusCode).toBe(200)
  })
  test('bad token provided, should respond 400', async () => {
    const response = await request(app).get('/api/empleados').set('Authorization', `Bearer ${badToken}`).send()
    expect(response.statusCode).toBe(400)
  })
  test('Empleado creation, should respond 201', async () => {
    const response = await request(app).post('/api/empleados').set('Authorization', `Bearer ${token}`).send({
      fechaIngreso: "2024-05-22",
      nombre: "empleado 3",
      salario: "4500000"
    })
    expect(response.statusCode).toBe(201)
  })
})

// solicitud
describe('solicitud routes', () => {
  test('no token provided, should respond 400', async () => {
    const response = await request(app).get('/api/solicitud').send()
    expect(response.statusCode).toBe(400)
  })
  test('no token provided, should respond 400', async () => {
    const response = await request(app).post('/api/solicitud').send()
    expect(response.statusCode).toBe(400)
  })
  test('no token provided, should respond 400', async () => {
    const response = await request(app).delete('/api/solicitud').send()
    expect(response.statusCode).toBe(400)
  })
  test('token provided, should respond 200', async () => {
    const response = await request(app).get('/api/solicitud').set('Authorization', `Bearer ${token}`).send()
    expect(response.statusCode).toBe(200)
  })
  test('bad token provided, should respond 400', async () => {
    const response = await request(app).get('/api/solicitud').set('Authorization', `Bearer ${badToken}`).send()
    expect(response.statusCode).toBe(400)
  })
  test('Solicitud creation, should respond 201', async () => {
    const response = await request(app).post('/api/solicitud').set('Authorization', `Bearer ${token}`).send({
      codigo: "9896",
      descripcion: "creada desde api",
      resumen: "API rest",
      idEmpleado: 2
    })
    expect(response.statusCode).toBe(201)
  })
  test('Solicitud remove, should respond 200', async () => {
    const response = await request(app).delete('/api/solicitud/1').set('Authorization', `Bearer ${token}`).send()
    expect(response.statusCode).toBe(200)
  })
})