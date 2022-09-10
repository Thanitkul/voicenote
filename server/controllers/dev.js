const express = require("express")
const con = require("../models/db")
const router = express.Router();

/**
 * Endpoint http://localhost:3000/api/dev/
 */
router.get("/users", async (req, res, next) => {
    try {
      const users = await con.query("SELECT * FROM users")
      res.send(users);
    } catch (error) {
      res.json(error)
    }
  });

router.get("/courses", async (req, res, next) => {
    try {
      const courses = await con.query("SELECT * FROM courses")
      res.send(courses);
    } catch (error) {
      res.json(error)
    }
  });

router.get("/recordings", async (req, res, next) => {
try {
    const recordings = await con.query("SELECT * FROM recordings")
    res.send(recordings);
} catch (error) {
    res.json(error)
}
});

router.get("/student-course", async (req, res, next) => {
    try {
        const student_course = await con.query("SELECT * FROM student_course")
        res.send(student_course);
    } catch (error) {
        res.json(error)
    }
    });

module.exports = router;