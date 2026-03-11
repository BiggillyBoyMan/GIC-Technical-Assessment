const express = require('express')
const router = express.Router()
const container = require('../config/container')

const EmployeeController = require('../employees/EmployeeController')
const employeeController = container.resolve('employeeController')

router.get('/get', employeeController.getAll)

router.post('/create', employeeController.create)

module.exports = router