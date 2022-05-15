const PathwayService = require("../services/pathway.service");

class PathwayController {
  createPathway = {
    middleware: [],
    action: async (req, res) => {
      const content = req.body;
      console.log("Registering user with the credentials");
      PathwayService.create(content)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  };

  getPathway = {
      middlware: [],
      action: async (req, res) => {
          console.log('Getting the available pathways')
          PathwayService.get()
          .then((result) => {
              console.log(result);
          })
          .catch((err) => {
              console.error(err);
          })
      }
  }
}

module.exports = new PathwayController();
