const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const con = require("../models/db")
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const RouteProtection = require("../helpers/RouteProtection")
const sendEmail = require("../helpers/SendEmail")

async function sendPasswordResetEmail(email, resetToken, origin) {
    let message;
     
    if (origin) {
        const resetUrl = `${origin}/apiRouter/resetPassword?token=${resetToken} email=${email}`;
        message = `<p>Please click the below link to reset your password, the following link will be valid for only 1 hour:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/apiRouter/reset-password</code> api route:</p>
                   <p><code>${resetToken}</code></p>`;
    }
 
    await sendEmail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: ' Reset your Password',
        html: `<h4>Reset Password</h4>
               ${message}`
    });
}

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
router.post("/signup", async function (req, res, next) {
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
            'SELECT `email`, `username`, `dob` FROM `users` WHERE id = ?',
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

router.post("/forget-password", async (req, res) => {
    try {
        const email = req.body.email;
        const origin = req.header('Origin'); // we are  getting the request origin from  the origin header.

        const user = await con.query("SELECT * FROM users WHERE email = ?", email)

        if (!user) {
            res.status(400).json({ message: "the user doesn't exist"})
        } else {
            await con.query("UPDATE reset_password_token SET used = ?  WHERE email = ?", [1, email])

            const resetToken = crypto.randomBytes(40).toString('hex');
            const expiredAt = new Date(Date.now() + 60*60*1000);
            const createdAt = new Date(Date.now());

            await con.query("INSERT INTO reset-password-token ( email, Token_value,created_at, expired_at, used) VALUES (?, ?,?, ?, ?)'", [ email, resetToken, createdAt, expiredAt, 0])
            await sendPasswordResetEmail(email,resetToken, origin);

            res.status(200).json({ message: 'Please check your email for a new password' });
        }
    } catch (error) {
        
    }
})

module.exports = router