const PathwayService = require("../services/pathway.service");

class PathwayController {
  createPathway = {
    middleware: [],
    action: async (req, res) => {
      const content = req.body;
      console.log("Registering user with the credentials");
      PathwayService.create(content)
        .then((result) => {
          res.status(201).send({message: result.message})
        })
        .catch((err) => {
          res.status(500).send({ error: err })
        });
    },
  };

  getPathway = {
      middlware: [],
      action: async (req, res) => {
          console.log('Getting the available pathways')
          PathwayService.get()
          .then((result) => {
            res.status(200).send({message: result.message})
          })
          .catch((err) => {
            res.status(500).send({ error: err.message })
          })
      }
  }

  addCourseToPathway = {
    middleware: [],
    action: async (req, res) => {
      const id = req.params.id
      const course = req.body
      console.log('Adding the course to the pathway using ID')
      PathwayService.addContent(id, course)
      .then((result) => {
        res.status(201).send({ message: result.message})
      })
      .catch((err) => {
        res.status(500).send({ error: err })
      })
    }
  }

  fetchPathway = {
    middleware: [],
    action : async function (req, res) {
      const id = req.params.id
      console.log('Fetching the specified pathway')
      PathwayService.getPathByID(id)
      .then((result) => {
        res.status(200).send({message : result.message})
      })
      .catch((err) => {
        res.status(500).send({ error: err })
      })
    }
  }
}

module.exports = new PathwayController();
