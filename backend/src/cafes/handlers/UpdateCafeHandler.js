const { z } = require('zod')

const updateCafeSchema = z.object({
  id: z.string().uuid('Invalid cafe ID'),
  name: z.string().min(6, 'Name must be at least 6 characters').max(10, 'Name must be at most 10 characters'),
  description: z.string().max(256, 'Description must be at most 256 characters'),
  logo: z.string().nullish(),
  location: z.string().min(1, 'Location is required')
})

class UpdateCafeHandler {
    constructor({ cafeRepository }) {
        this.cafeRepository = cafeRepository
    }

    async handle(command) {
        updateCafeSchema.parse(command)
        return this.cafeRepository.update(command)
    }
}

module.exports = UpdateCafeHandler