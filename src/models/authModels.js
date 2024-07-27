import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const AuthModels = {
    comparePassword: async (password, hashedPassword) =>{
        try {
            const result = await bcrypt.compare(password, hashedPassword)
    
            return result

        } catch (error) {
            throw new Error(error)
        }
        
    },
    verifyToken: async (token) => {
        try {
            const tokenKey = jwt.verify(token, process.env.JWT_SECRET_KEY)

            return tokenKey 
            
        } catch (error) {
            console.error('Invalid token:', error.message)
            return null
        }
    },

    authorized: async (bearerToken) => {
        try {
            if(!bearerToken){
                throw new Error('Unauthorized', 401)
            }

            const token = bearerToken.replace('Bearer ', '')

            const user = await AuthModels.verifyToken(token)

            if(!user){
                throw new Error('User not found', 404)
            }

            return user
        } catch (error) {
            throw new Error('Internal server error', 500)
        }
    }
}

export default AuthModels