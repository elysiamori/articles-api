import db from '../config/config.js'
import bcrypt from 'bcryptjs'
const SALT = 10

const UserModels = {
    registerUser: async (body) => {
        try {
            const hashPass = await bcrypt.hash(body.password, SALT); // Turn password into hash
            const sql = `INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, ?)`;
    
            const [newUser] = await db.execute(sql, [body.username, body.email, hashPass, 2]);
            console.log(`${body.username} successfully registed`)
    
            // Verifikasi bahwa newUser mengandung ID atau data user yang baru dibuat
            if (newUser.insertId) {
                return { newUser: { id: newUser.insertId }, hashPass };
            } else {
                throw new Error('Failed to register user', 400);
            }
    
        } catch (error) {
            console.error("Error in registerUser model:", error);
            throw new Error('Failed to register user', 500);
        }
    },

    getEmail: async (email) =>{
        try {
            const sql = `SELECT * FROM users WHERE email = '${email}'`
        
            return await db.execute(sql)
            
        } catch (error) {
            throw new Error('Failed get email', 400)
        }
       
    },

    getUserById: async (id) => {
        try {
            const sql = `SELECT id FROM users WHERE id = ${id}`

            const results =  await db.execute(sql)

            return results
        } catch (error) {
            throw new Error(`Failed get by id contents`, 500)
        }
    },
}

export default UserModels