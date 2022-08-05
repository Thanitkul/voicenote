import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from 'jsonwebtoken';
import cryptoRandomString from 'crypto-random-string';

const router = Router()
const prisma = new PrismaClient()

function codeExists(code, existingCodes) {
    return existingCodes.some(function(el) {
      return el.code === code;
    }); 
  }

router.get('/courses', async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(user)
        let courses;
        if (user.userId) {
            courses = await prisma.Course.findMany({
                where: {
                    userId: user.userId
                }
            });
            console.log(courses)
        } else {
            throw new Error()
        }
    
        res.send(courses);
    } catch (error) {
      next(error);
    }
  
  });

router.post('/create-course', async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.TOKEN_SECRET);

        var code = cryptoRandomString({length: 6, type: 'alphanumeric'});

        const existingCodes = await prisma.Course.findMany({
            select: {
                code: true
              }
        })

        console.log(existingCodes);

        while (codeExists(code, existingCodes)) {
            var code = cryptoRandomString({length: 6, type: 'alphanumeric'});
        }

        if (user.userId) {
            const course = await prisma.Course.create({
                data: {
                    courseName: req.body.courseName,
                    code: code,
                    User: {
                        connect: {
                                id: user.userId
                        }
                    }
                },
                include: {
                    User: true
                }
            })
        }
        res.status(200).json({ message: "Success"})
    } catch (error) {
        next(error);
    }
})

  export default router;
