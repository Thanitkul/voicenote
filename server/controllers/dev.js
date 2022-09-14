const express = require("express")
const con = require("../models/db")
const router = express.Router();

/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/dev/
 */
router.get("/users", async (req, res, next) => {
    try {
      const users = await con.query("SELECT * FROM users")
      con.end
      res.json(users);
    } catch (error) {
      res.json(error)
    }
  });

router.get("/courses", async (req, res, next) => {
    try {
      const courses = await con.query("SELECT * FROM courses")
      con.end
      res.json(courses);
    } catch (error) {
      res.json(error)
    }
  });

router.get("/recordings", async (req, res, next) => {
try {
    const recordings = await con.query("SELECT * FROM recordings")
    con.end
    res.json(recordings);
} catch (error) {
    res.json(error)
}
});

router.get("/student-course", async (req, res, next) => {
    try {
        const student_course = await con.query("SELECT * FROM student_course")
        con.end
        res.json(student_course);
    } catch (error) {
        res.json(error)
    }
    });

module.exports = router;