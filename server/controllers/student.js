const express = require("express")
const con = require("../models/db")
const RouteProtection = require("../helpers/RouteProtection")
const router = express.Router()

function isStudent(userId, canView) {
    return canView.some(function (el) {
      return el.studentId === userId;
    });
  }

/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/student/courses
 */
router.get('/courses', RouteProtection.verify, async (req, res, next) => {
    try {
        const courses = await con.query(
            'SELECT courses.id, `courseName`, `code`, `isLive`, `liveGroupId` FROM `courses` LEFT JOIN `student_course` ON (courses.id = student_course.courseId) WHERE `studentId` = ?',
            [req.user.userId]
        )
        
        res.json(courses);
    } catch (error) {
        console.log({ error })
        // if error.??? = token expire or token invalid
        // should reponse 401 and message Unauthorized
        res.status(500).json(error)
    }
})

/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/student/get-recordings/:id
 */
router.get('/get-recordings/:id', RouteProtection.verify, async (req, res, next) => {
    try {
        const isStudent = await con.query("SELECT * FROM student_course WHERE studentId = ? AND courseId = ?", [req.user.userId, req.params.id] );

        if(!isStudent) {
            
            res.status(401).json({ message: "Unauthorised, Not enrolled in this course" })
        } else {
            
            res.status(200).json((await con.query("SELECT date(recordedAt) recordedAtDate, time(recordedAt) recordedAtTime, groupId FROM recordings WHERE courseId = ? GROUP BY groupId ORDER BY id", [req.params.id])))
        }
    } catch (err) {
        next(err)
    }
})

/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/student/join-course
 */
router.post('/join-course', RouteProtection.verify, async (req, res, next) => {
    try {
        const courseId = await con.query(
            "SELECT `id` FROM `courses` WHERE `code` = ?",
            [req.body.code]
        )

        const already_join = await con.query(
            'SELECT `id` FROM `student_course` WHERE `studentId` = ? AND `courseId` = ?',
            [[req.user.userId], courseId[0]['id']]
        )
        console.log(already_join);
        if (already_join.length != 0) {
            
            res.json({ message: "user already joined" })
        } else {
            const student_course = await con.query(
                'INSERT INTO student_course (`studentId`, `courseId`) VALUE (?,?)',
                [[req.user.userId], courseId[0]['id']]
            )
            
            res.status(200).json({ message: "Success" })
        }
    } catch (error) {
        next(error);
    }
})

/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/student/leave-course
 */
router.delete('/leave-course', RouteProtection.verify, async(req, res, next) => {

  try {
      const courseID = req.body.courseId;
    
      await con.query("DELETE FROM student-course WHERE `studentId` = ? AND `courseId` = ?", [req.user.userId, courseID]);

      res.status(200).json({message: "course left"})
  } catch(error) {
        res.status(500)
  }
})

/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/student/get-recording-data/:groupId
 */
router.get('/get-recording-data/:groupId', RouteProtection.verify, async (req, res) => {
    try {
        const canView = await con.query("SELECT studentId FROM student_course LEFT JOIN `recordings` ON (student_course.courseId = recordings.courseId) WHERE recordings.groupId = ?", [req.params.groupId])
        
        console.log(canView.length)
        console.log(canView)
        console.log(req.user.userId)
        if (canView.length == 0 || !isStudent(req.user.userId, canView)) {
            res.status(401).json({ message: "not the student of the course that this recording belongs to"})
        } else {
            const data = await con.query("SELECT data FROM recordings WHERE groupId = ? ORDER BY id", [req.params.groupId])
            res.status(200).json(data)
        }
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})

module.exports = router
