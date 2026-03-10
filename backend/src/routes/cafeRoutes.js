const express = require('express')
const router = express.Router()
const container = require('../config/container')

const CafeController = require('../cafes/CafeController')
const cafeController = container.resolve('cafeController')

router.get('/', cafeController.getAll)

router.post('/create', cafeController.createCafe)

router.put('/update/:id', cafeController.updateCafe)

module.exports = router