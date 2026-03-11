const GetEmployeesQuery = require("../employees/queries/GetEmployeesQuery")
const CreateEmployeesCommand = require("./commands/CreateEmployeeCommand")
const UpdateEmployeeCommand = require('../employees/commands/UpdateEmployeeCommand')

class EmployeeController {
    constructor({ mediator }) {
        this.mediator = mediator
        this.getAll = this.getAll.bind(this)
        this.create = this.create.bind(this)
        this.update = this.update.bind(this)
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

    async create(req, res, next) {
        try{
           const { name, email_address, phone_number, gender, cafe_id } = req.body
           const body = new CreateEmployeesCommand(name, email_address, phone_number, gender, cafe_id) 
           const result = await this.mediator.send(body)
           res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }

    async update(req, res, next) {
        try{
            console.log('params:', req.params)
            console.log('body', req.body)
            const { id } = req.params
            console.log('updating ID: ', id)
            const { name, email_address, phone_number, gender, cafe_id } = req.body
            const cafeProvided = 'cafe_id' in req.body
            const command = new UpdateEmployeeCommand(id, name, email_address, phone_number, gender, cafe_id, cafeProvided)
            const result = await this.mediator.send(command)
            res.json(result)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = EmployeeController