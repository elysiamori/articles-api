import Joi from "joi"

const userRequest = Joi.object({
    username: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    passwordconfirm: Joi.string().min(6).required()
})

export default userRequest