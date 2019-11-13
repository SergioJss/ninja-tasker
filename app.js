//packages

const express = require("express");
const bodyParser = require("body-parser");

//starting express app

const app = express();

//Middleware

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//View Engine
app.set("view engine", "ejs");

let list = ["Code and Watch Anime", "Slackline tonight"];

//GET

app.get("/home", function(req, res) {
  res.render("Home.ejs", { list: list });
});

app.post("/home", function(req, res) {
  console.log(req.body.taskItem);
  list.push(req.body.taskItem);
  res.render("Home.ejs", { list: list });
});

app.delete("/delete/:index", function(req, res) {
  console.log(req.params.index);
  list.splice(req.params.index, 1);
  res.json(list);
});

//Listen9 for request
app.listen(3000, function() {
  console.log("server is live on port: 3000");
});
