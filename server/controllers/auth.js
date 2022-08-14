import { Router } from "express";
import { compare, hash } from "bcrypt";
import jwt from 'jsonwebtoken';
import { con } from "../server.js";
const { sign } = jwt;

const router = Router()

const findUserWithId = async (userId) => {
    await con.query(
        'SELECT * FROM `users` WHERE `id` = ?',
        [userId],
        function(err, results) {
            return results[0] || null;
        }
    )
}

router.post("/signin", async function signin(req, res, next) {
    try {
        console.log(req.body.email)

        const user = await con.query(
            'SELECT * FROM `users` WHERE `email` = ?',
            [req.body.email],
            function(err, results) {
                return results || null;
            }
        )
        if (user[0].length != 0) {
            const isCorrectPassword = await compare(req.body.password, user[0][0]['password']);

            console.log(isCorrectPassword)

            if (!isCorrectPassword) return res.status(401).json({
                message: "Incorrect password"
            })

            const token = sign({
                userId: user[0][0]['id']
            }, process.env.TOKEN_SECRET)

            res.status(200).json({ token: token })
        } else {
            res.json({message: "user not found"})
        }
    } catch (error) {
        console.log(error)
    }
}
)

router.post("/signup", async function signup(req, res, next) {
    console.log("sign up");

    try {
        const existingUser = await con.query(
            'SELECT * FROM `users` WHERE `email` = ?',
            [req.body.email],
            function(err, results) {
                return results || null;
            }
        )

        if (existingUser[0].length != 0) throw new Error("User already existed")
    
        const user = await con.query(
            'INSERT INTO `users` (`username`, `email`, `password`, `dob`)VALUE (?, ?, ?, ?)',
            [req.body.username, req.body.email, await hash(req.body.password, 12), new Date(req.body.dob)],
            function(err, results) {
                return results || null;
            }
        )
    
    
        res.status(200).json({ message: "Success"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error, type: "something went wrong"})
    }
    
})

router.get("/get-username", async function getUsername(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.TOKEN_SECRET);

        const username = await con.query(
            'SELECT `username` FROM `users` WHERE id = ?',
            [user.userId],
            function(err, results) {
                return results;
            }
        )
        if (username[0].length == 1) {
            res.status(200).json(username[0][0])
        } else {
            res.json({message: "username not found"})
        }
    } catch (error) {
        console.log(error);
    }
})

export default router;