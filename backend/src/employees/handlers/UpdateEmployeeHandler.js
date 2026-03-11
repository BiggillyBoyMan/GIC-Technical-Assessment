const { z } = require('zod')

const updateEmployeeSchema = z.object({
    id: z.string().min(1, 'Employee ID is required'),
    name: z.string().min(6, 'Name must be at least 6 characters').max(10,'Name must be less than 10 characters'),
    email_address: z
    .string()
    .trim() // Removes whitespace from both ends
    .toLowerCase() // Standardizes the input
    .email("Invalid email address"),
    phone_number: z.string().regex(
        /^[89]\d{7}$/, "Invalid Singapore phone number, make be 8 digit: "
    ),
    gender: z.enum(['Male', 'Female'], { message: 'Gender must be Male or Female' }),
    cafe_id: z.string().uuid('Invalid Cafe ID').nullable().optional()
})

class UpdateEmployeeHandler {
    constructor({ employeeRepository }) {
        this.employeeRepository = employeeRepository
    }

    async handle(command) {
        console.log('handler received: ', command)
        updateEmployeeSchema.parse(command)
        return this.employeeRepository.update(command)
    }
}

module.exports = UpdateEmployeeHandler