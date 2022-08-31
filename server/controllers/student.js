import { Router } from "express";
import jwt from 'jsonwebtoken';
import { con } from "../server.js";
const require = createRequire(import.meta.url);
const RouteProtection = require('../helpers/RouteProtection')

const router = Router()

router.get('/courses', RouteProtection.verify, async (req, res, next) => {
    try {
    let courses;
    let headers
      if (user.userId) {
        [courses, headers] = await con.query(
          'SELECT courses.id, `courseName`, `code` FROM `courses` LEFT JOIN `student_course` ON (courses.id = student_course.courseId) WHERE `studentId` = ?',
          [user.userId]
        )
      } else {
        throw new Error()
      }
  
      res.send(courses);
    } catch (error) {
      next(error);
    }
  
  })

  router.post('/join-course', RouteProtection.verify, async (req, res, next) => {
    try {
      const [courseId, headers_id] = await con.query(
        "SELECT `id` FROM `courses` WHERE `code` = ?",
        [req.body.code]
      )
      
      const [already_join, headers_already_join] = await con.query(
        'SELECT `id` FROM `student_course` WHERE `studentId` = ? AND `courseId` = ?',
        [user.userId, courseId[0]['id']]
      )
      console.log(already_join);
      if(already_join.length != 0) {
        res.json({message: "user already joined"})
      } else {
        const student_course = await con.query(
          'INSERT INTO student_course (`studentId`, `courseId`) VALUE (?,?)',
          [user.userId, courseId[0]['id']]
        )
        res.status(200).json({message: "Success"})
      }
    } catch (error) {
      next(error);
    }
  })

  export default router