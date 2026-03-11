class CreateEmployeesCommand {
    constructor(name, email_address, phone_number, gender, cafe_id) {
        this.name = name
        this.email_address = email_address
        this.phone_number = phone_number
        this.gender = gender
        this.cafe_id = cafe_id
    }
}

module.exports = CreateEmployeesCommand