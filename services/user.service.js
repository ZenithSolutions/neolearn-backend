const res = require("express/lib/response");
const User = require("../models/user.model");

class UserService {
  register = async (_body) => {
    const newuser = _body;
    if (newuser.password != newuser.password2)
      return res.status(400).json({ message: "password not match" });
    try {
      User.findOne({ email: newuser.email }, function (err, user) {
        if (user) {
          return `${user} already registered`
        }
        const doc = User.create(newuser)
         return doc
      });
    } catch (err) {
      return { error: err }
    }
  };

  login = async (_token) => {
    const token = _token;
    User.findByToken(token, (err, user) => {
      if (err) return res(err);
      if (user)
        return res.status(400).json({
          error: true,
          message: "You are already logged in",
        });
      else {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (!user)
            return res.json({
              isAuth: false,
              message: " Auth failed ,email not found",
            });

          user.comparepassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
              return res.json({
                isAuth: false,
                message: "password doesn't match",
              });

            user.generateToken((err, user) => {
              if (err) return res.status(400).send(err);
              res.cookie("auth", user.token).json({
                isAuth: true,
                id: user._id,
                email: user.email,
              });
            });
          });
        });
      }
    });
  };

  get = (async) => {
    console.log("Fetching data from Database");
    this.offset = 10;
    this.queryLimit = 10;

    const query = {};

    try {
      const userList = User.find(query);
      return { message: userList };
    } catch (err) {
      return {
        message: `Error occured while fetching the data from the DB ${err}`,
      };
    }
  };
}
module.exports = new UserService();
