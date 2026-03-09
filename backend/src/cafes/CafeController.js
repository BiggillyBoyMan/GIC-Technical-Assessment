const GetCafesQuery = require('./queries/GetCafesQuery')

class CafeController {
    constructor({ mediator }) {
        this.mediator = mediator

        this.getAll = this.getAll.bind(this)
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
}

module.exports = CafeController