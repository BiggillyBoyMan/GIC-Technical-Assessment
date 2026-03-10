const { createContainer, asClass, asValue } = require('awilix')

const pool = require('./database')
const Mediator = require('../mediator/Mediator')

const CafeController = require('../cafes/CafeController')

// Get/cafes - location
const CafeRepository = require('../cafes/CafeRepository')
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

module.exports = container