import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT = {
    signJwt: (id) => {
        return jwt.sign({id}, process.env.JWT_SECRET_KEY,{
            expiresIn: process.env.JWT_EXP
        })
    }
}
 
export default JWT