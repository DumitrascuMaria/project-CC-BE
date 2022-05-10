const express = require("express");
const connection = require("../db.js");
const router = express.Router();
const mysql = require("mysql");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM questions", (err, results) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      data: results,
    });
  });
});

router.post("/", (req, res) => {
  const { questionText, questionRightAnswer, questionWrongAnswer } = req.body;

  if (!questionText || !questionRightAnswer || !questionWrongAnswer) {
    // send bad request error
    return res.status(400).send("Bad request. Missing parametres.");
  }

  const queryString = `INSERT INTO questions (questionText, questionRightAnswer, questionWrongAnswer) VALUES (${mysql.escape(
    questionText
  )}, ${mysql.escape(questionRightAnswer)}, ${mysql.escape(
    questionWrongAnswer
  )})`;

  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      data: results,
    });
  });
});

// get by id route
router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    // send bad request error
    return res.status(400).send("Bad request. Missing parametres.");
  }
  const queryString = `SELECT * FROM questions WHERE questionID = ${mysql.escape(
    id
  )}`;
  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("Message not found.");
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
  const queryString = `DELETE FROM questions WHERE questionID = ${mysql.escape(
    id
  )}`;
  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("Question not found.");
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

  const { questionText, questionRightAnswer, questionWrongAnswer } = req.body;

  if (!questionText || !questionRightAnswer || !questionWrongAnswer) {
    // send bad request error
    return res.status(400).send("Bad request. Missing parametres.");
  }
  const queryString = `UPDATE questions SET questionText = ${mysql.escape(
    questionText
  )}, questionRightAnswer = ${mysql.escape(
    questionRightAnswer
  )}, questionWrongAnswer = ${mysql.escape(
    questionWrongAnswer
  )} WHERE questionID = ${mysql.escape(id)}`;
  connection.query(queryString, (err, results) => {
    if (err) {
      return res.send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("Question not found.");
    }
    return res.json({
      results,
    });
  });
});

module.exports = router;
