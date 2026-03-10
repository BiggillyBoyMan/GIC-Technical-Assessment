class CreateCafeCommand {
    constructor(name, description, logo, location) {
        this.name = name
        this.description = description
        this.logo = logo
        this.location = location
    }
}

module.exports = CreateCafeCommand