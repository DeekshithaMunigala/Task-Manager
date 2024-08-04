const pg = require("pg");
const { Client } = pg;
const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "Your_Password",
  database: "test",
});

client
  .connect()
  .then(() => {
    client.query(
      "create table if not exists tasks(id SERIAL, name VARCHAR(25) NOT NULL);"
    );
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = { client };
