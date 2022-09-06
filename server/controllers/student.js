import { Router } from "express";
import jwt from 'jsonwebtoken';
import { con } from "../server.js";
import { RouteProtection } from "../helpers/RouteProtection.js";

const router = Router()

router.get('/courses', RouteProtection.verify, async (req, res, next) => {
    try {
      if (!req.user.id) throw new Error()
      
      const [courses, headers] = await con.query(
        'SELECT courses.id, `courseName`, `code` FROM `courses` LEFT JOIN `student_course` ON (courses.id = student_course.courseId) WHERE `studentId` = ?',
        [req.user.id]
      )
  
      res.send(courses);
    } catch (error) {
      next(error);
    }  
  })

  router.get('/get-recording/:id', RouteProtection.verify, async (req, res, next) => {
    try {
      if (!(await con.query("SELECT * FROM `student_course` WHERE `studentId` = " + [req.user.id] + " AND `courseId` = " + [req.params.id]))[0][0]) return res.status(401).json({ message: "Unauthorised, Not enrolled in this course" })

      res.status(200).json((await con.query("SELECT * FROM `recordings` WHERE `courseId` = ?", [req.params.id]))[0][0])
      
    } catch (err) {
      next(err)
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