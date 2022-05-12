const express = require("express");
const connection = require("../db.js");
const router = express.Router();
const mysql = require("mysql");
const { sendMail } = require("./mailFunctions.js");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM students", (err, results) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      data: results,
    });
  });
});

router.post("/", (req, res) => {
  const { studentName, studentGrade } = req.body;

  if (!studentName || !studentGrade) {
    // send bad request error
    return res.status(400).send("Bad request. Missing parametres.");
  }

  const queryString = `INSERT INTO students (studentName, studentGrade) VALUES
   (${mysql.escape(studentName)}, ${mysql.escape(studentGrade)})})`;

  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      data: results,
    });
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    // send bad request error
    return res.status(400).send("Bad request. Missing parametres.");
  }
  const queryString = `SELECT * FROM students WHERE studentID = ${mysql.escape(
    id
  )}`;
  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("Student not found.");
    }
    return res.json({
      data: results,
    });
  });
});

// delete by id route
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    // send bad request error
    return res.status(400).send("Bad request. Missing parametres.");
  }
  const queryString = `DELETE FROM students WHERE studentID = ${mysql.escape(
    id
  )}`;
  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("Student not found.");
    }
    return res.json({
      results,
    });
  });
});

// Add update by id route
router.put("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    // send bad request error
    return res.status(400).send("Bad request. Missing parametres.");
  }

  const { studentName, studentGrade } = req.body;

  if (!studentName || !studentGrade) {
    // send bad request error
    return res.status(400).send("Bad request. Missing parametres.");
  }
  const queryString = `UPDATE students SET studentName = ${mysql.escape(
    studentName
  )}, studentGrade = ${mysql.escape(
    studentGrade
  )} WHERE studentID = ${mysql.escape(id)}`;
  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("Student not found.");
    }
    return res.json({
      results,
    });
  });
});

router.post("/sendMail", async (req, res) => {
  const { receiver, sender, subject, msg } = req.body;
  if (!receiver || !sender || !subject || !msg) {
    return res.status(400).send("Bad request. Missing parametres.");
  }

  try {
    const sendMailResponse = await sendMail(receiver, sender, subject, msg);
  } catch (err) {
    console.log(err);
    return res.send("Something went wrong");
  }
});

module.exports = router;
