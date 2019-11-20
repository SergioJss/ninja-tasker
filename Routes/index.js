const express = require("express");
const db = require("../models");
const routes = express.Router();
const passport = require("../config/passport");
const authenticate = require("../config/middleware/isAuthenticated");

//GET

routes.get("/home", authenticate, function(req, res) {
  console.log(req.user);
  db.Tasks.findAll({
    where: { userID: req.user.id }
  }).then(function(results) {
    console.log(results);
    res.render("Home.ejs", { list: results, user: req.user });
  });
});

routes.post("/ninja", authenticate, function(req, res) {
  // console.log(req.body.taskItem);
  db.Tasks.create({
    todo: req.body.taskItem,
    userID: req.user.id
  }).then(function(results) {
    // console.log(results);
    res.redirect("/home");
  });
});

routes.delete("/delete/:index", authenticate, function(req, res) {
  console.log(req.params.index);
  db.Tasks.destroy({ where: { id: req.params.index } }).then(function(results) {
    console.log(results);
    res.redirect("/home");
  });
  res.json(db);
});

//GET Login
routes.get("/user/login", function(req, res) {
  res.render("login.ejs");
});

//POST Login
routes.post(
  "/user/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/user/login"
  })
);

//GET Signup
routes.get("/user/registration", function(req, res) {
  res.render("registration.ejs");
});

//POST Signup
routes.post(
  "/user/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/home",
    failureRedirect: "/user/signup"
  })
);

//GET Profile
routes.get("/profile", authenticate, function(req, res) {
  res.render("profile. ejs", { user: req.user });
});

//GET logout

routes.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/home");
});

module.exports = routes;
