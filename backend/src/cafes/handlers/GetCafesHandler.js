class GetCafesHandler {
    constructor({ cafeRepository }) {
        this.cafeRepository = cafeRepository
    }

    async handle(query) {
        return this.cafeRepository.getAll(query.location)
    }
}

module.exports = GetCafesHandler