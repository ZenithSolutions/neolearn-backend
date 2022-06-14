const express = require("express");
const cookieParser = require("cookie-parser");
const googleApi = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./models/user.model");
const routes = require("./routes");
const dbInitialize = require("./lib/mongo.db");
const router = require("./routes");
require("dot-env").config;

const app = express();

const boot = async () => {
  passport.use(
    new googleApi(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://www.neolearn.in/",
      },
      function (accessToken, refreshToken, profile, done) {
        console.log("MY PROFILE", profile, profile._json.email);
        User.findOne({ email: profile._json.email }).then((user) => {
          if (user) {
            console.log("User already exits in DB", user);
            done(null, user);
          } else {
            User.create({
              username: profile.displayName,
              email: profile._json.email,
            })
              .then((user) => {
                console.log("New User", user);

                done(null, user);
              })
              .catch((err) => console.log(err));
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log(user, "user");
    done(null, user);
  });

  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api", routes);
  app.get("/", (req, res) => {
    res.status(200).send({ message: "The server is working" });
  });
  // listening port
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    dbInitialize();
    console.log(`app is live at ${PORT}`);
  });
};

boot();
