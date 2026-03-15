require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const cafeRoutes = require('./routes/cafeRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost')
  .split(',')

app.use(cors({ origin: allowedOrigins }))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use('/cafes', cafeRoutes)
app.use('/employees', employeeRoutes)

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app