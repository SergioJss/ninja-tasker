const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

//telling passport what strategy to use
//and using email/password
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email"
    },
    function(email, password, done) {
      //when a user attempts to login run this code
      db.Users.findOne({ where: {email: email} }).then(function(dbUser){
    //     if there is no user tell them no user my email register
    if (!dbUser){
        return done(null, false, {message: "incorrect email"});
    }
    
    // if there is a user but passwords don't match, tell them wrong password
    else if(!dbUser.verifyPassword(passport)){
        return done(bull, false, { message: "Incorrect password"})
    }
    return done (null, dbUser);
    
    
    // if none of the above return user 

})
      
      function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      };
    }
  )
);

module.exports = passport;
