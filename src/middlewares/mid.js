import Authorized from '../models/authModels.js'

const authorize = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'No token provided'
            });
        }

        console.log(bearerToken)

        const token = bearerToken.replace('Bearer ', '');
        const user = await Authorized.verifyToken(token);

        if (!user) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid token'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            error: 'Failed',
            message: error.message
        });
    }
};


export default authorize