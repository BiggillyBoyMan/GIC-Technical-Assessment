class DeleteCafeHandler {
    constructor({ cafeRepository }) {
        this.cafeRepository = cafeRepository
    }

    async handle(command) {
        return this.cafeRepository.delete(command.id)
    }
}

module.exports = DeleteCafeHandler