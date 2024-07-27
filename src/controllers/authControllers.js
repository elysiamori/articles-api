import authRequest from '../entities/authEntity.js'
import UserModels from '../models/usersModels.js'
import AuthModels from '../models/authModels.js'
import JWT from '../helpers/jwt.js'

const AuthControllers = {
   
    loginUser: async (req, res) => {
        const {body} = req

        const {error} = authRequest.validate(body)
        if(error){
            return res.status(400).json({
                error: error.details[0].message
            })
        }

        const [user] = await UserModels.getEmail(body.email)

        if(user.length === 0){
            return res.status(400).json({
                error: 'Invalid email or password'
            })
        }

        try {
            const correctPass = await AuthModels.comparePassword(body.password, user[0].password)

            console.log("Pass: ", correctPass)

            if(!correctPass){
                return res.status(400).json({
                    error: 'Invalid email or password'
                })
            }
            
            const token = JWT.signJwt({id: user[0].id})
            
            res.status(200).json({
                message: `Login user ${user[0].username} success`,
                token
            })

        } catch (error) {
            res.status(500).json({
                error: 'Internal server error'
            })
        }
        
    },
}

export default AuthControllers