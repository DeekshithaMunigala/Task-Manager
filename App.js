const express = require("express");
const app = express();
let bodyParser = require("body-parser");
const db = require("./database.js");

const port = 8001;

app.use(bodyParser.json());
let id;

const CORRECT_USERNAME = "testuser";
const CORRECT_PASSWORD = "testpassword";

app.get("/", (req, res) => {
  res.send("Hello welcome to express app");
});

app.get("/tasks", async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).send("No authorization");
  }

  const encoded = req.headers.authorization.split(" ")[1];
  const decoded = Buffer.from(encoded, "base64").toString("ascii");
  const [username, password] = decoded.split(":");

  if (CORRECT_USERNAME == username && CORRECT_PASSWORD == password) {
    const tasks = await db.client.query(`Select * from tasks`);
    res.send(tasks);
  } else {
    res.status(401).send("Invalid Credentials");
  }
});

app.get("/tasks/:id", async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).send("No authorization");
  }

  const encoded = req.headers.authorization.split(" ")[1];
  const decoded = Buffer.from(encoded, "base64").toString("ascii");
  const [username, password] = decoded.split(":");

  if (CORRECT_USERNAME == username && CORRECT_PASSWORD == password) {
    const task = await db.client.query(
      `Select * from tasks where id = ${req.params.id}`
    );
    res.send(task);
  } else {
    res.status(401).send("Invalid Credentials");
  }
});

app.post("/tasks", async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).send("No authorization headers");
  }

  const encoded = req.headers.authorization.split(" ")[1];
  const decoded = Buffer.from(encoded, "base64").toString("ascii");
  const [username, password] = decoded.split(":");

  if (CORRECT_USERNAME == username && CORRECT_PASSWORD == password) {
    await db.client.query(
      `Insert into tasks(name) values('${req.body.name}');`
    );
    res.send("created");
  } else {
    res.status(401).send("Invalid Credentials");
  }
});

app.put("/tasks/:id", async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).send("No authorization");
  }

  const encoded = req.headers.authorization.split(" ")[1];
  const decoded = Buffer.from(encoded, "base64").toString("ascii");
  const [username, password] = decoded.split(":");

  if (CORRECT_USERNAME == username && CORRECT_PASSWORD == password) {
    await db.client.query(
      `Update tasks set name = '${req.body.name}' where id = ${req.params.id}`
    );
    res.send("Updated");
  } else {
    res.status(401).send("Invalid Credentials");
  }
});

app.delete("/tasks/:id", async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).send("No authorization");
  }

  const encoded = req.headers.authorization.split(" ")[1];
  const decoded = Buffer.from(encoded, "base64").toString("ascii");
  const [username, password] = decoded.split(":");

  if (CORRECT_USERNAME == username && CORRECT_PASSWORD == password) {
    await db.client.query(`Delete from tasks where id = ${req.params.id}`);
    res.send("deleted");
  } else {
    res.status(401).send("Invalid Credentials");
  }
});

app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`);
});
