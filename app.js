//packages

const express = require("express");

//starting express app

const app = express();

//View engine

app.use(express.static("./public"));

//setting engine

app.set("view engine", "ejs");

//GET

app.get("/home", function(req, res) {
  res.render("home.ejs");
});

//Listen for request
app.listen(3000, function() {
  console.log("server is live on port: 3000");
});
