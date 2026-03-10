const GetCafesQuery = require('./queries/GetCafesQuery')
const CreateCafeCommand = require('./commands/CreateCafeCommand')

class CafeController {
    constructor({ mediator }) {
        this.mediator = mediator

        this.getAll = this.getAll.bind(this)

        this.createCafe = this.createCafe.bind(this)
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
}

module.exports = CafeController