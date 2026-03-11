const GetCafesQuery = require('./queries/GetCafesQuery')
const CreateCafeCommand = require('./commands/CreateCafeCommand')
const UpdateCafeCommand = require('./commands/UpdateCafeCommand')
const DeleteCafeCommand = require('./commands/DeleteCafeCommand')

class CafeController {
    constructor({ mediator }) {
        this.mediator = mediator

        this.getAll = this.getAll.bind(this)

        this.createCafe = this.createCafe.bind(this)

        this.updateCafe = this.updateCafe.bind(this)

        this.deleteCafe = this.deleteCafe.bind(this)
    }

    async getAll(req, res, next) {
        try {
            const { location } = req.query
            const query = new GetCafesQuery(location)
            const result = await this.mediator.send(query)
            res.json(result)
        } catch (err) {
            next(err)
        }
    }

    async createCafe(req, res, next) {
        try {
            const { name, description, logo, location } = req.body
            const body = new CreateCafeCommand(name, description, logo, location)
            const result = await this.mediator.send(body)
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }

    async updateCafe(req, res, next) {
        try {
            const { id } = req.params
            const { name, description, logo, location } = req.body
            const command = new UpdateCafeCommand(id, name, description, logo, location)
            const result = await this.mediator.send(command)
            res.json(result)
        } catch (err) {
            next(err)
        }
    }

    async deleteCafe(req, res, next) {
        try {
            console.log('params:', req.params)
            console.log('url:', req.url)
            const { id } = req.params
            console.log('deleting id: ', id)
            const command = new DeleteCafeCommand(id)
            const result = await this.mediator.send(command)
            res.json(result)
        } catch (err) {
            console.log('error:', err.message)
            next(err)
        }
    }
}

module.exports = CafeController