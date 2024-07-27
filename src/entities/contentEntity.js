import Joi from "joi";

const contentRequest = Joi.object({
    author_id: Joi.number().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    category: Joi.string().required() // Technology, News, Lifestyle, Beverage, Social, Other
})

export default contentRequest