class UpdateCafeCommand {
    constructor(id, name, description, logo, location) {
        this.id = id
        this.name = name
        this.description = description
        this.logo = logo
        this.location = location
    }
}

module.exports = UpdateCafeCommand