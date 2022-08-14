import { Router } from "express";
import jwt from 'jsonwebtoken';
import { con } from "../server.js";

const router = Router()

router.get('/courses', async (req, res, next) => {
    try {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    let courses;
      if (user.userId) {
        courses = await con.query(
          'SELECT courses.id, `courseName`, `code` FROM `courses` LEFT JOIN `student_course` ON (courses.id = student_course.courseId) WHERE `studentId` = ?',
          [user.userId],
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
  
  })

  router.post('/join-course', async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      const courseId = await con.query(
        "SELECT `id` FROM `courses` WHERE `code` = ?",
        [req.body.code],
        function(err, results) {
          return results
        }
      )
      
      const already_join = await con.query(
        'SELECT `id` FROM `student_course` WHERE `studentId` = ? AND `courseId` = ?',
        [user.userId, courseId[0][0]['id']],
        function(err, results) {
          return results
        }
      )
      console.log(already_join[0]);
      if(already_join[0].length != 0) {
        res.json({message: "user already joined"})
      } else {
        const student_course = await con.query(
          'INSERT INTO student_course (`studentId`, `courseId`) VALUE (?,?)',
          [user.userId, courseId[0][0]['id']]
        )
        res.status(200).json({message: "Success"})
      }
    } catch (error) {
      next(error);
    }
  })

  export default router