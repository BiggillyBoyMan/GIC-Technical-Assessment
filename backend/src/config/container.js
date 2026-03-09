const { createContainer, asClass, asValue } = require('awilix')

const pool = require('./database')
const Mediator = require('../mediator/Mediator')

const CafeRepository = require('../cafes/CafeRepository')
const CafeController = require('../cafes/CafeController')
const GetCafesHandler = require('../cafes/handlers/GetCafesHandler')
const GetCafesQuery = require('../cafes/queries/GetCafesQuery')

const container = createContainer()

container.register({
  db: asValue(pool),
  mediator: asClass(Mediator).singleton(),
  cafeRepository: asClass(CafeRepository).singleton(),
  cafeController: asClass(CafeController).singleton(),
  getCafesHandler: asClass(GetCafesHandler).singleton(),
})

const mediator = container.resolve('mediator')
mediator.register(GetCafesQuery.name, container.resolve('getCafesHandler'))

module.exports = container