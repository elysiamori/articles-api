import dotenv from 'dotenv'
dotenv.config()
const validApiKey = process.env.API_KEY.split(',')

const apiKeyMiddleware =  (req, res, next) => {
    const apiKey = req.header('x-api-key')
    if(!apiKey || !validApiKey.includes(apiKey)){
        return res.status(401).json({
            message: 'Invalid API Key'
        })
    } 
    next()
}

export default apiKeyMiddleware