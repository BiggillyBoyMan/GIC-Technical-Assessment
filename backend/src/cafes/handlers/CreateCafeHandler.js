const { z } = require('zod')

const createCafeSchema = z.object({
  name: z.string().min(6, 'Name must be at least 6 characters').max(10, 'Name must be at most 10 characters'),
  description: z.string().max(256, 'Description must be at most 256 characters'),
  logo: z.string().nullish(),
  location: z.string().min(1, 'Location is required')
})

class CreateCafeHandler {
    constructor({ cafeRepository }) {
        this.cafeRepository = cafeRepository
    }

    async handle(command) {
        createCafeSchema.parse(command)
        return this.cafeRepository.create(command)
    }
}

module.exports = CreateCafeHandler