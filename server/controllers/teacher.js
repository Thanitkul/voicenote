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
        if (user.userId) {
            courses = await con.query(
              'SELECT * FROM `courses` WHERE `ownerId` = ?',
              [user.id],
              function(err, results) {
                return results
              }
            )
          } else {
            throw new Error()
          }
      
          res.send(courses[0]);
    } catch (error) {
      next(error);
    }
  
  });

router.post('/create-course', async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.TOKEN_SECRET);

        var code = cryptoRandomString({length: 6, type: 'alphanumeric'});

        const existingCodes = await con.query(
            "SELECT `id` FROM `courses` WHERE `code` = ?",
            [code],
            function(err, results) {
                return results
            }
        )

        console.log(existingCodes);

        while (codeExists(code, existingCodes)) {
            var code = cryptoRandomString({length: 6, type: 'alphanumeric'});
        }

        if (user.userId) {
            const course = await con.query(
                "INSERT INTO `courses` (`courseName`, `code`, `ownerId`) VALUE (?, ?, ?)",
                [req.body.courseName, code, user.id],
                function(err, results)
                {
                    console.log([req.body.courseName, code, user.id])
                }
            )
        res.status(200).json({ message: "Success"})
    }
    } catch (error) {
        next(error);
    }
});

  export default router;
