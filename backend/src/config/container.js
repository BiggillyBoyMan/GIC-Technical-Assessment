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


const container = createContainer()

container.register({
  db: asValue(pool),
  mediator: asClass(Mediator).singleton(),
  cafeRepository: asClass(CafeRepository).singleton(),
  cafeController: asClass(CafeController).singleton(),
  getCafesHandler: asClass(GetCafesHandler).singleton(),
  createCafeHandler: asClass(CreateCafeHandler).singleton(),
})

const mediator = container.resolve('mediator')
//get cafes API
mediator.register(GetCafesQuery.name, container.resolve('getCafesHandler'))
//create cafes API
mediator.register(CreateCafeCommand.name, container.resolve('createCafeHandler'))

module.exports = container