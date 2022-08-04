import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from 'jsonwebtoken';

const router = Router()
const prisma = new PrismaClient()

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
  
  })

  export default router;