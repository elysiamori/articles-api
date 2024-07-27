import db from '../config/config.js'

const roleSeeder = async () => {
    try {
        const roles = [
            {role: 'Admin'},
            {role: 'User'}
        ]
    
        const rolesId = []
        for (const role of roles){
            const [result] = await db.query('INSERT INTO roles (role) VALUES (?)', [role.role])

            // untuk mempush role kedalam table
            rolesId.push(result.insertId)
        }

        console.log('Seeds role successfully')

        const [rows] = await db.query('SELECT * FROM roles')
        const rolesName = rows.map(row => row.role)

        console.log('Seeded roles: ', rolesName)

    } catch (error) {
        console.error('Error seeds role')
    } finally {
        await db.end()
    }
    
}

roleSeeder()
