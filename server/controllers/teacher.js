import { Router } from "express";
import jwt from 'jsonwebtoken';
import cryptoRandomString from 'crypto-random-string';
import { con } from "../server.js";

const router = Router()

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
        let headers;
        if (user.userId) {
            [courses, headers] = await con.query(
              'SELECT * FROM `courses` WHERE `ownerId` = ?',
              [user.userId]
            )
          } else {
            throw new Error()
          }
          res.send(courses)
    } catch (error) {
      next(error);
    }
  
  });

router.post('/create-course', async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.TOKEN_SECRET);

        var code = cryptoRandomString({length: 6, type: 'alphanumeric'});

        const [existingCodes, headers] = await con.query(
            "SELECT `id` FROM `courses` WHERE `code` = ?",
            [code]
        )

        console.log(existingCodes);

        while (codeExists(code, existingCodes)) {
            var code = cryptoRandomString({length: 6, type: 'alphanumeric'});
        }
        console.log(user.userId)
        if (user.userId) {
            const course = await con.query(
                "INSERT INTO `courses` (`courseName`, `code`, `ownerId`) VALUE (?, ?, ?)",
                [req.body.courseName, code, user.userId],
                function(err, results)
                {
                    console.log([req.body.courseName, code, user.userId])
                }
            )
        res.status(200).json({ message: "Success"})
    }
    } catch (error) {
        next(error);
    }
});

  export default router;
