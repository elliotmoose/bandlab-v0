const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.static("public"));

app.get("/posts", (req, res) => {
  res.sendFile(__dirname + "/public/src/pages/posts/posts.html");
});

app.get("/player", (req, res) => {
  res.sendFile(__dirname + "/public/src/pages/player/player.html");
});

app.get("/audio", (req, res) => {
  // read from file system in /public/audio
  // return list of files
  res.json(
    fs.readdirSync(__dirname + "/public/audio").map((file) => `/audio/${file}`)
  );
});

app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.listen(port, () => console.log(`Server Listening on Port: ${port}!`));
