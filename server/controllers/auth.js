import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { compare, hash } from "bcrypt";
import jwt from 'jsonwebtoken';
const { sign } = jwt;

const prisma = new PrismaClient()

const router = Router()

const findUserWithId = async (userId) => {
    const user = await prisma.User.findFirst({
        where: {
            id: userId
        }
    })
    return user || null;
}

router.post("/signin", async function signin(req, res, next) {
    console.log("Hello")
    try {
        console.log(req.body.email)

        const user = await prisma.User.findFirst({
            where: {
                email: req.body.email
            }
        })
        const isCorrectPassword = await compare(req.body.password, user.password);

        if (!isCorrectPassword) return res.status(401).json({
            message: "Incorrect password"
        })

        const token = sign({
            userId: user.id
        }, process.env.TOKEN_SECRET)

        res.status(200).json({ token: token })
    } catch (error) {
        console.log(error)
    }
}
)

router.post("/signup", async function signup(req, res, next) {
    console.log("sign up");

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        })

        // console.log(existingUser)
        if (existingUser) throw new Error("User alr existed")
    
        const user = await prisma.User.create({
            data: {
                name: req.body.username,
                email: req.body.email,
                password: await hash(req.body.password, 12),
                dob: new Date(req.body.dob)
            }
        })
    
    
        res.status(200).json({ message: "Success"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error, type: "something went wrong"})
    }
    
})

export default router;