const UserService = require("../services/user.service");

class UserController {
  create = {
    middleware: [],
    action: async (req, res) => {
      const newuser = req.body;
      console.log("Registering user with the credentials");
      UserService.register(newuser)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  };

  loginUser = {
    middleware: [],
    action: async (req, res) => {
      console.log("Checking permissions for the user to login");
      let token = req.cookies.auth;
      UserService.login(token)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  };

  getUser = {
    action: async (req, res) => {
      res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.firstname + req.user.lastname,
      });
    },
  };

  logoutUser = {
    action: async (req, res) => {
      req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200);
      });
    },
  };

  getAllUsers = {
      middleware: [],
      action : async (req, res) => {
          console.log('Getting all the user Data');
          UserService.get()
          .then((user) => {
              console.log(user)
          })
          .catch(err => console.error(err));
      }
  }
}

module.exports = new UserController();
