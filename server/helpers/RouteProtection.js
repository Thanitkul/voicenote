import jwt from 'jsonwebtoken';
const { sign } = jwt;

export class RouteProtection {
    static verify(req, res, next) {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader.split(' ').pop()
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

            req.user = { id: decoded.id }

            return next()
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized' }).end()
        }
    }
}
