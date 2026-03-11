class DeleteEmployeeHandler {
    constructor({ employeeRepository }) {
        this.employeeRepository = employeeRepository
    }

    async handle(command) {
        return this.employeeRepository.delete(command.id)
    }
}

module.exports = DeleteEmployeeHandler