const express = require('express')
const router = express.Router()
const container = require('../config/container')

const CafeController = require('../cafes/CafeController')
const cafeController = container.resolve('cafeController')

router.get('/', cafeController.getAll)

module.exports = router