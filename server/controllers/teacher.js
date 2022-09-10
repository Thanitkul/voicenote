const express = require("express")
const router = express.Router()
const cryptoRandomString = require('crypto-random-string')
const con = require("../models/db")
const RouteProtection = require("../helpers/RouteProtection")

function codeExists(code, existingCodes) {
    return existingCodes.some(function(el) {
      return el.code === code;
    }); 
  }

/**
* Endpoint http://localhost:3000/api/teacher/courses
*/
router.get('/courses', RouteProtection.verify, async (req, res, next) => {
    try {
        let courses;
        let headers;
        if (req.user.userId) {
            courses = await con.query(
              'SELECT * FROM `courses` WHERE `ownerId` = ?',
              [req.user.userId]
            )
          } else {
            throw new Error()
          }
          res.send(courses)
    } catch (error) {
      next(error);
    }
  
  });

/**
* Endpoint http://localhost:3000/api/teacher/create-course
*/
router.post('/create-course', RouteProtection.verify, async (req, res, next) => {
    try {
      console.log(cryptoRandomString)
        var code = cryptoRandomString({length: 6, type: 'alphanumeric'});

        const existingCodes = await con.query(
            "SELECT `id` FROM `courses` WHERE `code` = ?",
            [code]
        )

        while (codeExists(code, existingCodes)) {
            var code = await cryptoRandomString({length: 6, type: 'alphanumeric'});
        }
        console.log(user.userId)
        if ([req.user.userId]) {
            const course = await con.query(
                "INSERT INTO `courses` (`courseName`, `code`, `ownerId`) VALUE (?, ?, ?)",
                [req.body.courseName, code, [req.user.userId]],
                function(err, results)
                {
                    console.log([req.body.courseName, code, [req.user.userId]])
                }
            )
        res.status(200).json({ message: "Success"})
    }
    } catch (error) {
        next(error);
    }
});

/**
* Endpoint http://localhost:3000/api/teacher/delete-course
*/
router.delete('/delete-course', RouteProtection.verify, async (req, res, next) => {
    try {

      const course = await con.query("SELECT id, ownerId FROM courses WHERE id = ?", req.body.courseId
      )
      console.log(course)
      if (course.length != 0) {
        if ([req.user.userId] != course[0].ownerId) {
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
module.exports = router
