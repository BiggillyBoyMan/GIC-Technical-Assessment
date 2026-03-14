const express = require('express')
const router = express.Router()
const container = require('../config/container')
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const CafeController = require('../cafes/CafeController')
const cafeController = container.resolve('cafeController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, `${uuidv4()}${ext}`)
    }
})

const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024}})

router.get('/', cafeController.getAll)

router.post('/', upload.single('logo'), cafeController.createCafe)

router.put('/:id', upload.single('logo'), cafeController.updateCafe)

router.delete('/:id', cafeController.deleteCafe)

module.exports = router