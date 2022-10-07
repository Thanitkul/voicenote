const express = require("express");
const router = express.Router();
const con = require("../models/db");
const RouteProtection = require("../helpers/RouteProtection");

function codeExists(code, existingCodes) {
  return existingCodes.some(function (el) {
    return el.code === code;
  });
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/teacher/courses
 */
router.get("/courses", RouteProtection.verify, async (req, res, next) => {
  try {
    let courses;
    if (req.user.userId) {
      courses = await con.query("SELECT * FROM `courses` WHERE `ownerId` = ?", [
        req.user.userId,
      ]);
    } else {
      throw new Error();
    }

    res.json(courses);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/courses/:courseId",
  RouteProtection.verify,
  async (req, res, next) => {
    try {
      const course = await con.query("SELECT * FROM courses WHERE id = ?", [
        req.params.courseId,
      ]);
      res.json(course);
    } catch (error) {
      console.log(error);
    }
  }
);

/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/teacher/create-course
 */
router.post(
  "/create-course",
  RouteProtection.verify,
  async (req, res, next) => {
    try {
      var code = makeid(6);

      const existingCodes = await con.query(
        "SELECT `id` FROM `courses` WHERE `code` = ?",
        [code]
      );

      while (codeExists(code, existingCodes)) {
        var code = makeid(6);
      }
      if ([req.user.userId]) {
        const course = await con.query(
          "INSERT INTO `courses` (`courseName`, `code`, `ownerId`) VALUE (?, ?, ?)",
          [req.body.courseName, code, [req.user.userId]],
          function (err, results) {
            console.log([req.body.courseName, code, [req.user.userId]]);
          }
        );

        res.status(200).json({ message: "Success" });
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/teacher/delete-course
 */
router.delete(
  "/delete-course",
  RouteProtection.verify,
  async (req, res, next) => {
    try {
      const course = await con.query(
        "SELECT id, ownerId FROM courses WHERE id = ?",
        req.body.courseId
      );
      console.log(course);
      if (course.length != 0) {
        if ([req.user.userId] != course[0].ownerId) {
          res.status(401).json({ message: "not the owner of the course" });
        }

        await con.query(
          "DELETE FROM student_course WHERE courseId = ?",
          req.body.courseId
        );
        await con.query(
          "DELETE FROM recordings WHERE courseId = ?",
          req.body.courseId
        );
        await con.query("DELETE FROM courses WHERE id = ?", req.body.courseId);

        res.status(200);
      } else {
        res.status(400).json({ message: "course not found" });
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/teacher/start-live
 */
router.patch("/start-live", RouteProtection.verify, async (req, res, next) => {
  try {
    await con.query("UPDATE courses SET isLive = 1 WHERE id = ?", [
      req.body.courseId,
    ]);

    const date = new Date();
    let groupId =
      req.body.courseId +
      date.getFullYear() +
      date.getMonth() +
      date.getDate() +
      date.getTime();

    await con.query("UPDATE courses SET liveGroupId = ? WHERE id = ?", [
      groupId,
      req.body.courseId,
    ]);
    await con.query("INSERT INTO recordings (`courseId`, `groupId`, `data`) VALUE (?, ?, ?)", [req.body.courseId, groupId, " "]);

    res.status(200).json({ groupId: groupId });
  } catch (error) {
    console.log(error);
  }
});

/**
 * Endpoint https://newtonian-voicenote.fly.dev/api/teacher/end-live
 */
router.patch("/end-live", RouteProtection.verify, async (req, res, next) => {
  try {
    const owner = await con.query("SELECT ownerId FROM courses WHERE id = ?", [
      req.body.courseId,
    ]);

    if (owner[0]["ownerId"] == req.user.userId) {
      await con.query("UPDATE courses SET isLive = 0 WHERE id = ?", [
        req.body.courseId,
      ]);
      await con.query("UPDATE courses SET liveGroupId = NULL WHERE id = ?", [
        req.body.courseId,
      ]);
      res.status(200).json({ message: "ended" });
    } else {
      res.status(401).json({ message: "not the owner of course" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
