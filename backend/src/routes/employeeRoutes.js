const express = require('express')
const router = express.Router()
const container = require('../config/container')

const EmployeeController = require('../employees/EmployeeController')
const employeeController = container.resolve('employeeController')

router.get('/', employeeController.getAll)

router.post('/', employeeController.create)

router.put('/:id', employeeController.update)

router.delete('/:id', employeeController.delete)

module.exports = router