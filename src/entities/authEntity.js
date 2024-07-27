import Joi from 'joi'

const authRequest = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

export default authRequest