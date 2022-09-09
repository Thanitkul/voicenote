const express = require("express")
const jwt = require('jsonwebtoken')
const db = require("../models/db")
const RouteProtection = require("../helpers/RouteProtection")
const router = express.Router()

/**
 * Endpoint http://localhost:8080/api/students/courses
 */
router.get('/courses', RouteProtection.verify, async (req, res, next) => {
    try {
        const courses = await db.query(
            'SELECT courses.id, `courseName`, `code`, `isLive` FROM `courses` LEFT JOIN `student_course` ON (courses.id = student_course.courseId) WHERE `studentId` = ?',
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
 * Endpoint http://localhost:8080/api/students/get-recording/:id
 */
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
        const user = jwt.verify(req.headers.authorization.split(' ').pop(), process.env.TOKEN_SECRET)
        const [courseId, headers_id] = await con.query(
            "SELECT `id` FROM `courses` WHERE `code` = ?",
            [req.body.code]
        )

        const [already_join, headers_already_join] = await con.query(
            'SELECT `id` FROM `student_course` WHERE `studentId` = ? AND `courseId` = ?',
            [user.userId, courseId[0]['id']]
        )
        console.log(already_join);
        if (already_join.length != 0) {
            res.json({ message: "user already joined" })
        } else {
            const student_course = await con.query(
                'INSERT INTO student_course (`studentId`, `courseId`) VALUE (?,?)',
                [user.userId, courseId[0]['id']]
            )
            res.status(200).json({ message: "Success" })
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router