import { Router } from "express";
import jwt from 'jsonwebtoken';
import cryptoRandomString from 'crypto-random-string';
import { con } from "../server.js";
import { RouteProtection } from "../helpers/RouteProtection.js";

const router = Router()

function codeExists(code, existingCodes) {
    return existingCodes.some(function(el) {
      return el.code === code;
    }); 
  }

router.get('/courses', RouteProtection.verify, async (req, res, next) => {
    try {
        const user = jwt.verify(req.headers.authorization.split(' ').pop(), process.env.TOKEN_SECRET)
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

router.post('/create-course', RouteProtection.verify, async (req, res, next) => {
    try {
        const user = jwt.verify(req.headers.authorization.split(' ').pop(), process.env.TOKEN_SECRET)
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

router.delete('/delete-course', RouteProtection.verify, async (req, res, next) => {
    try {
      const user = jwt.verify(req.headers.authorization.split(' ').pop(), process.env.TOKEN_SECRET)

      const [course, course_header] = await con.query("SELECT id, ownerId FROM courses WHERE id = ?", req.body.courseId
      )
      console.log(course)
      if (course.length != 0) {
        if (user.userId != course[0].ownerId) {
          res.status(401).json({ message: "not the owner of the course"})
        }

        await con.query("DELETE FROM student_course WHERE courseId = ?", req.body.courseId);
        await con.query("DELETE FROM recordings WHERE courseId = ?", req.body.courseId);
        await con.query("DELETE FROM courses WHERE id = ?", req.body.courseId);

        res.status(200)
      } else {
      res.status(400).json({ message: "course not found"})
      }
    } catch (error) {
        next(error);
    }
})
export default router;
