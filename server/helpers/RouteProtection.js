const jwt = require('jsonwebtoken')
const con = require("../models/db")
const { sign } = jwt;

class RouteProtection {
    static verify(req, res, next) {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader.split(' ').pop()
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

            
            req.user = { userId: decoded.userId }

            return next()
        } catch (error) {
            console.log(error)
            res.status(401).json({ message: 'Unauthorized' }).end()
        }
    }
}

module.exports = RouteProtection
