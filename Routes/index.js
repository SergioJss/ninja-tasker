const express = require("express");
const routes = express.Router();

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

module.exports = routes;
