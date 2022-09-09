import { Router } from "express";
import { compare, hash } from "bcrypt";
import jwt from 'jsonwebtoken';
import { con } from "../server.js";
const jwt = require('jsonwebtoken')
import { RouteProtection } from "../helpers/RouteProtection.js";

const router = Router()

const findUserWithId = async (userId) => {
    const [data, headers] =  await con.query(
        'SELECT * FROM `users` WHERE `id` = ?',
        [userId]
    )

    return data || null;
}

router.post("/signin", async function signin(req, res, next) {
    try {
        console.log(req.body.email)

        const [user, headers] = await con.query(
            'SELECT * FROM `users` WHERE `email` = ?',
            [req.body.email]
        )
        if (user.length != 0) {
            const isCorrectPassword = await compare(req.body.password, user[0]['password']);

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

router.post("/signup", async function signup(req, res, next) {
    console.log("sign up");

    try {
        const [existingUser, headers] = await con.query(
            'SELECT * FROM `users` WHERE `email` = ?',
            [req.body.email]
        )

        if (existingUser.length != 0) throw new Error("User already existed")
    
        const user = await con.query(
            'INSERT INTO `users` (`username`, `email`, `password`, `dob`)VALUE (?, ?, ?, ?)',
            [req.body.username, req.body.email, await hash(req.body.password, 12), new Date(req.body.dob)]
        )
    
    
        res.status(200).json({ message: "Success"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error, type: "something went wrong"})
    }
    
})

router.get("/get-username", RouteProtection.verify, async function getUsername(req, res, next) {
    try {
        const user = jwt.verify(req.headers.authorization.split(' ').pop(), process.env.TOKEN_SECRET)
        const [username, headers] = await con.query(
            'SELECT `username` FROM `users` WHERE id = ?',
            [user.userId]
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

export default router;