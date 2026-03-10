class CafeRepository {
    constructor({ db }) {
        this.db = db
    }

    async getAll(location) {
        const values = []
        let whereText = ''

        if(location) {
            values.push(location)
            whereText = `WHERE c.location = $1`
        }

        const result = await this.db.query(`
            SELECT
                c.cafe_id AS id,
                c.name,
                c.description,
                c.logo,
                c.location,
                COUNT(ec.employee_id) :: int AS employees
            FROM cafe c
            LEFT JOIN employee_cafe ec ON c.cafe_id = ec.cafe_id
            ${whereText}
            GROUP BY c.cafe_id
            ORDER BY employees DESC
            `, values)

            return result.rows
    }

    async create(command) {
        const { name, description, logo, location } = command

        const result = await this.db.query(`
            INSERT INTO cafe (cafe_id, name, description, logo, location)
            VALUES (uuid_generate_v4(), $1, $2, $3, $4)
            RETURNING 
                cafe_id as ID,
                name,
                description,
                logo,
                location
            `, [name, description, logo || null, location])

        return result.rows[0]
    }
}

module.exports = CafeRepository