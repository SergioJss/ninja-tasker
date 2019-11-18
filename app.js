//packages

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const routes = require("./Routes");

//starting express app

const app = express();

//Middleware

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//View Engine
app.use(routes);
app.set("view engine", "ejs");

db.sequelize.sync().then(function() {
  app.listen(3000, function(err) {
    if (err) console.log(err);
    console.log("server is live on port: 3000");
  });
});

//Listen9 for request
