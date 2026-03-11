class EmployeeRepository {
    constructor({ db }) {
        this.db = db
    }

    async getAll(cafe) {
        const values = []
        let whereText = ''

        if(cafe) {
            values.push(cafe)
            whereText = `WHERE ec.cafe_id = $1`
        }

        const result = await this.db.query(`
            SELECT
                e.employee_id,
                e.name,
                e.email_address,
                e.phone_number,
                COALESCE(
                    EXTRACT(DAYS FROM NOW() - ec.start_date)::int,
                    0
                ) AS days_worked,
                COALESCE(c.name, '') AS cafe    
            FROM employee e
            LEFT JOIN employee_cafe ec ON e.employee_id = ec.employee_id
            LEFT JOIN cafe c ON ec.cafe_id = c.cafe_id
            ${whereText}
            ORDER BY days_worked DESC
            `, values)
        
        return result.rows
    }
}

module.exports = EmployeeRepository