const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const questionsRouter = require("./router/questionsRouter");
const studentsRouter = require("./router/studentsRouter");

// const { sendMail } = require("./router/mailFunctions.js");
// sendMail(
//   "dumitrascusandra18@stud.ase.ro",
//   "dumitrascusandra18@stud.ase.ro",
//   "TestSubject",
//   "TestMessage"
// );

const app = express();
app.use(cors());

const port = process.env.PORT || 8080;

app.use("/questions", questionsRouter);
app.use("/student", studentsRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
