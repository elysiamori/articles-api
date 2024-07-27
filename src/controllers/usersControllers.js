import userRequest from "../entities/usersEntity.js"
import UserModels from "../models/usersModels.js"
import JWT from '../helpers/jwt.js'

const UserControllers = {
    registerUser: async (req, res) => {
        const { body } = req;
    
        // validate user request
        const { error } = userRequest.validate(body);
        if (req.body.password !== req.body.passwordconfirm) {
            return res.status(400).json({
                error: 'password and password confirm do not match',
            });
        }
    
        if (error) {
            return res.status(400).json({
                error: error.details[0].message,
            });
        }
    
        try {
            const { newUser, hashPass } = await UserModels.registerUser(body);
    
            const token = JWT.signJwt(newUser.id);
    
            res.status(201).json({
                data: {
                    id: newUser.id,
                    username: body.username,
                    email: body.email,
                    password: hashPass,
                    token,
                },
                message: `User ${body.username} created successfully`,
            });

        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({
                error: error.message,
                message: "Internal server error",
            });
        }
    },

    getUserById: async (req, res) => {
        const {id} = req.params

        try {
            const [user] = await UserModels.getUserById(id)

            res.status(200).json({
                user
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    }
}

export default UserControllers