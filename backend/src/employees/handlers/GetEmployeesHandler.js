class GetEmployeesHandler {
    constructor({ employeeRepository }) {
        this.employeeRepository = employeeRepository
    }

    async handle(query) {
        return this.employeeRepository.getAll(query.cafe)
    }
}

module.exports = GetEmployeesHandler