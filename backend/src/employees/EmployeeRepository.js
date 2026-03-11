class EmployeeRepository {
    constructor({ db }) {
        this.db = db
    }

    generateEmployeeId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
        let result = 'UI'
        for(let i = 0; i < 7; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length)) 
        } 
        return result
    }

    async generateUniqueEmployeeId() {
        let id
        let exists = true
        while(exists) {
            id = this.generateEmployeeId()
            const results = await this.db.query(`
                SELECT 
                    employee_id
                FROM employee 
                WHERE employee_id = $1
                `, [id])
            exists = results.rows.length > 0
        }
        return id
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

    async create(body) {
        const id = await this.generateUniqueEmployeeId()
        const { name, email_address, phone_number, gender, cafe_id } = body

        //Check if there exist cafeId
        if(cafe_id) {
            const result = await this.db.query(`
                SELECT
                    cafe_id
                FROM cafe
                WHERE cafe_id = $1
                `, [cafe_id])
            if(result.rows.length === 0) {
                const error = new Error('Cafe not found')
                error.status = 404
                throw error
            }
        }

        //Insert into employee + relationship table
        const client = await this.db.connect()
        try{
            await client.query(`BEGIN`)
            const employeeResult = await client.query(`
                INSERT INTO employee (employee_id, name, email_address, phone_number, gender)
                VALUES($1, $2, $3, $4, $5)
                RETURNING
                    employee_id,
                    name,
                    email_address,
                    phone_number,
                    gender
                `, [id, name, email_address, phone_number, gender])
            if(cafe_id) {
                await client.query(`
                    INSERT INTO employee_cafe (employee_id, cafe_id)
                    VALUES($1, $2)
                    `, [id, cafe_id])
            }
            await client.query(`COMMIT`)
            return employeeResult.rows[0]
        } catch (err) {
            await client.query(`ROLLBACK`)
            throw err
        } finally {
            client.release()
        }
    }
}

module.exports = EmployeeRepository