const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const cors = require('cors')

// configuration
dotenv.config()
const app = express()

// middlewares
app.use(express.json())
app.use(cors())
// aqui se pueden cambiar las siguientes politicas (ya estan configuradas por defecto):
// Content-Security-Policy
// Cross-Origin-Embedder-Policy
// Cross-Origin-Opener-Policy
// Cross-Origin-Resource-Policy
// Origin-Agent-Cluster
// Referrer-Policy
// Strict-Transport-Security
// X-Content-Type-Options
// X-DNS-Prefetch-Control
// X-Download-Options
// X-Frame-Options
// X-Permitted-Cross-Domain-Policies
// X-Powered-By
// X-XSS-Protection
app.use(helmet())

app.use('/api', require('./routes/index'))

app.listen(3000, () => {
  console.log(`Server is Listening on 3000`)
})