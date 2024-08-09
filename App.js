const express = require("express");
const app = express();
let bodyParser = require("body-parser");
const db = require("./database.js");

const port = 8001;

app.use(bodyParser.json());

let id;

app.get("/", (req, res) => {
  res.send("Hello welcome to express app");
});

app.get("/tasks", async (req, res) => {
  if (!req.headers.authorization) {
    res.status(400).send("No authorization");
  }
  const tasks = await db.client.query(`Select * from tasks`);
  res.send(tasks);
});

app.get("/tasks/:id", async (req, res) => {
  const task = await db.client.query(
    `Select * from tasks where id = ${req.params.id}`
  );
  res.send(task);
});

app.post("/tasks", async (req, res) => {
  await db.client.query(`Insert into tasks(name) values('${req.body.name}');`);
  res.send("created");
});

app.put("/tasks/:id", async (req, res) => {
  await db.client.query(
    `Update tasks set name = '${req.body.name}' where id = ${req.params.id}`
  );
  res.send("Updated");
});

app.delete("/tasks/:id", async (req, res) => {
  await db.client.query(`Delete from tasks where id = ${req.params.id}`);
  res.send("deleted");
});

app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`);
});
