import jwt from 'jsonwebtoken';
import { con } from '../server.js';
const { sign } = jwt;

export class RouteProtection {
    static verify(req, res, next) {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader.split(' ').pop()
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

            req.user = { id: decoded.userId }

            return next()
        } catch (error) {
            console.log(error)
            res.status(401).json({ message: 'Unauthorized' }).end()
        }
    }
}
