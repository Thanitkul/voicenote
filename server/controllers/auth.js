const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const con = require("../models/db")
const jwt = require('jsonwebtoken')
const RouteProtection = require("../helpers/RouteProtection")

const findUserWithId = async (userId) => {
    const [data, headers] =  await con.query(
        'SELECT * FROM `users` WHERE `id` = ?',
        [userId]
    )
    
    return data || null;
}

/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/auth/signin
 */
router.post("/signin", async function signin(req, res, next) {
    try {
        console.log(req.body.email)

        const user = await con.query(
            'SELECT * FROM `users` WHERE `email` = ?',
            [req.body.email]
        )
        if (user.length != 0) {
            const isCorrectPassword = await bcrypt.compare(req.body.password, user[0]['password']);

            console.log(isCorrectPassword)

            if (!isCorrectPassword) return res.status(401).json({
                message: "Incorrect password"
            })

            const token = jwt.sign({
                userId: user[0]['id']
                
            }, process.env.TOKEN_SECRET)
            
            res.status(200).json({ token: token })
        } else {
            
            res.status(400).json({message: "user not found"})
        }
    } catch (error) {
        console.log(error)
    }
}
)

/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/auth/signup
 * request dob as yyyy-mm-dd
 */
router.post("/signup", async function signup(req, res, next) {
    console.log("sign up");

    try {
        const existingUser = await con.query(
            'SELECT * FROM `users` WHERE `email` = ?',
            [req.body.email]
        )

        if (existingUser.length != 0) {
            
            res.status(400).json({ message: "User already exist"})
        } else {
            const user = await con.query(
                'INSERT INTO `users` (`username`, `email`, `password`, `dob`)VALUE (?, ?, ?, ?)',
                [req.body.username, req.body.email, await bcrypt.hash(req.body.password, 12), new Date(req.body.dob)]
            )
            
            res.status(200).json({ message: "Success"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error, type: "something went wrong"})
    }
    
})

/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/auth/get-username
 */
router.get("/get-username", RouteProtection.verify, async function getUsername(req, res, next) {
    try {
        const username = await con.query(
            'SELECT `username` FROM `users` WHERE id = ?',
            [req.user.userId]
        )
        if (username.length == 1) {
            
            res.status(200).json(username[0])
        } else {
            
            res.status(400).json({message: "username not found"})
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router