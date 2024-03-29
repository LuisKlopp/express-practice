import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Youtube",
  dateStrings: true,
});

connection.query("SELECT * FROM `users`", function (err, results, fields) {
  const { id, email, name, created_at } = results[0];
  console.log(id, email, name, created_at);
});
