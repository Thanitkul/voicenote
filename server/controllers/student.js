const express = require("express")
const con = require("../models/db")
const RouteProtection = require("../helpers/RouteProtection")
const router = express.Router()

/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/student/courses
 */
router.get('/courses', RouteProtection.verify, async (req, res, next) => {
    try {
        const courses = await con.query(
            'SELECT courses.id, `courseName`, `code`, `isLive` FROM `courses` LEFT JOIN `student_course` ON (courses.id = student_course.courseId) WHERE `studentId` = ?',
            [req.user.userId]
        )
        con.end()
        res.json(courses);
    } catch (error) {
        console.log({ error })
        // if error.??? = token expire or token invalid
        // should reponse 401 and message Unauthorized
        res.status(500).json(error)
    }
})

/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/student/get-recording/:id
 */
router.get('/get-recording/:id', RouteProtection.verify, async (req, res, next) => {
    try {
        const isStudent = await con.query("SELECT * FROM student_course WHERE studentId = ? AND courseId = ?", [req.user.userId, req.params.id] );

        if(!isStudent) {
            con.end()
            res.status(401).json({ message: "Unauthorised, Not enrolled in this course" })
        } else {
            con.end()
            res.status(200).json((await con.query("SELECT * FROM `recordings` WHERE `courseId` = ?", [req.params.id])))
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
            con.end()
            res.json({ message: "user already joined" })
        } else {
            const student_course = await con.query(
                'INSERT INTO student_course (`studentId`, `courseId`) VALUE (?,?)',
                [[req.user.userId], courseId[0]['id']]
            )
            con.end()
            res.status(200).json({ message: "Success" })
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router