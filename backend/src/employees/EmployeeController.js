const GetEmployeesQuery = require("../employees/queries/GetEmployeesQuery")

class EmployeeController {
    constructor({ mediator }) {
        this.mediator = mediator
        this.getAll = this.getAll.bind(this)
    }

    async getAll(req,res,next) {
        try{
            const { cafe } = req.query
            const query = new GetEmployeesQuery(cafe)
            const result = await this.mediator.send(query)
            res.json(result)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = EmployeeController