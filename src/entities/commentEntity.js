import Joi from "joi";

const commentRequest = Joi.object({
    author_id: Joi.number().required(),
    content_id: Joi.number().required(),
    comment: Joi.string().required()
})

export default commentRequest