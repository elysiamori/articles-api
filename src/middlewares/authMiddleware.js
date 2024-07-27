import Authorized from '../models/authModels.js'

const authorize = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization
        if (!bearerToken) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'No token provided and',
                solution: 'Login to get a token'
            });
        }

        const user = await Authorized.authorized(bearerToken)
        req.user = user
        req.userId = user.id
        next()
    } catch (error) {
        res.status(500).json({
           error: 'Failed',
           message: error.message
        })
    }
}

export default authorize