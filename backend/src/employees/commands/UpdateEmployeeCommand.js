class UpdateEmployeeCommand {
    constructor(id, name, email_address, phone_number, gender, cafe_id, cafeProvided){
        this.id = id
        this.name = name
        this.email_address = email_address
        this.phone_number = phone_number
        this.gender = gender
        this.cafe_id = cafe_id
        this.cafeProvided = cafeProvided
    }
}

module.exports = UpdateEmployeeCommand