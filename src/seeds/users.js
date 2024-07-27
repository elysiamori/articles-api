import db from '../config/config.js'
import bcrypt from 'bcryptjs'

const SALT = 10

const usersSeeder = async () => {
    try {
        const users = [
            {
                username: 'vanica',
                email: 'vanica@gmail.com',
                password: bcrypt.hash('vanica123', SALT),
                role_id: 1
            },
            {
                username: 'mori',
                email: 'mori@gmail.com',
                password: bcrypt.hash('mori1234', SALT),
                role_id: 2
            }
        ]

        const usersId = []
        for (const user of users){
            const [result] = await db.query(`INSERT INTO users (username, email, password, role_id) VALUES
                    (?, ?, ?, ?)`, [user.username, user.email, user.password, user.role_id])

            usersId.push(result.insertId)
        }

        console.log('Seeds user successfully')

        const [rows] = await db.query('SELECT * FROM users')
        const usersName = rows.map( row => row.username)

        console.log('Seeded users: ', usersName)
    } catch (error) {
        console.error('Error seeds user')
    } finally{
        await db.end()
    }

}

usersSeeder()