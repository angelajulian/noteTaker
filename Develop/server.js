const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./db/db.json");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");

app.use(express.static("public"));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// api routes
app.get("/api/notes", (req, res) => {
  let results = db;
  res.json(results);
});

app.post("/api/notes", (req, res) => {
  let request = req.body;
  let id = uniqid();
  request.id = id;

  db.push(request);

  fs.writeFile(__dirname + "/db/db.json", JSON.stringify(db), (ERR) => {
    if (ERR) {
      console.log("ERROR: " + ERR);
    }
  });
});

// app.delete("api/notes:id", (req, res) => {
//   let id = req.params;
//   let newDb = db;
//   console.log(id, newDb);
// });

// html routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});
