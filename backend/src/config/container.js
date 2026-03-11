const { createContainer, asClass, asValue } = require('awilix')

const pool = require('./database')
const Mediator = require('../mediator/Mediator')

const CafeController = require('../cafes/CafeController')
const CafeRepository = require('../cafes/CafeRepository')

// Get/cafes - location
const GetCafesHandler = require('../cafes/handlers/GetCafesHandler')
const GetCafesQuery = require('../cafes/queries/GetCafesQuery')

// Post /Cafes
const CreateCafeCommand = require('../cafes/commands/CreateCafeCommand')
const CreateCafeHandler = require('../cafes/handlers/CreateCafeHandler')

//Put /Cafes
const UpdateCafeCommand = require('../cafes/commands/UpdateCafeCommand')
const UpdateCafeHandler = require('../cafes/handlers/UpdateCafeHandler')

//Delete /Cafes
const DeleteCafeCommand = require('../cafes/commands/DeleteCafeCommand')
const DeleteCafeHandler = require('../cafes/handlers/DeleteCafeHandler')

const EmployeeController = require('../employees/EmployeeController')
const EmployeeRepository = require('../employees/EmployeeRepository')

//Get Employees
const GetEmployeesQuery = require('../employees/queries/GetEmployeesQuery')
const GetEmployeesHandler = require('../employees/handlers/GetEmployeesHandler')

const container = createContainer()

container.register({
  db: asValue(pool),
  mediator: asClass(Mediator).singleton(),
  cafeRepository: asClass(CafeRepository).singleton(),
  cafeController: asClass(CafeController).singleton(),
  getCafesHandler: asClass(GetCafesHandler).singleton(),
  createCafeHandler: asClass(CreateCafeHandler).singleton(),
  updateCafeHandler: asClass(UpdateCafeHandler).singleton(),
  deleteCafeHandler: asClass(DeleteCafeHandler).singleton(),
  employeeController: asClass(EmployeeController).singleton(),
  employeeRepository: asClass(EmployeeRepository).singleton(),
  getEmployeesHandler: asClass(GetEmployeesHandler).singleton(),
})

const mediator = container.resolve('mediator')
//get cafes API
mediator.register(GetCafesQuery.name, container.resolve('getCafesHandler'))
//create cafe API
mediator.register(CreateCafeCommand.name, container.resolve('createCafeHandler'))
//update cafe API
mediator.register(UpdateCafeCommand.name, container.resolve('updateCafeHandler'))
//delete cafe API
mediator.register(DeleteCafeCommand.name, container.resolve('deleteCafeHandler'))
//get employees API
mediator.register(GetEmployeesQuery.name, container.resolve('getEmployeesHandler'))

module.exports = container