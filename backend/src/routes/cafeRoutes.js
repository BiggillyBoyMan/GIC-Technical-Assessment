const express = require('express')
const router = express.Router()
const container = require('../config/container')

const CafeController = require('../cafes/CafeController')
const cafeController = container.resolve('cafeController')

router.get('/get', cafeController.getAll)

router.post('/create', cafeController.createCafe)

router.put('/update/:id', cafeController.updateCafe)

router.delete('/delete/:id', cafeController.deleteCafe)

module.exports = router