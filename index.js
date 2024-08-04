const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const fs = require("node:fs");
const port = 8000;

app.use(bodyParser.json());

const tasks = [];
let id = 1;

fs.writeFile("text.txt", "New Task", (err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("Hello welcome to express app");
});

app.get("/tasks", (req, res) => {
  res.send(tasks);
});

app.post("/tasks", (req, res) => {
  tasks.push({ ...req.body, id: id, isCompleted: false });
  // fs.writeFile(
  //   "text.txt",
  //   JSON.stringify({ ...req.body, id: id, isCompleted: false }),
  //   (err) => {
  //     console.log(err);
  //   }
  // );
  id = id + 1;
  res.send("created");
});

app.put("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((task) => task.id == req.params.id);
  tasks[index] = req.body;
  res.send("Updated");
});

app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((task) => {
    return task.id == req.params.id;
  });

  tasks.splice(index, 1);
  res.send("deleted");
});

app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`);
});
