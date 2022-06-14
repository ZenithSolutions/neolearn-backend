const PathwayService = require("../services/pathway.service");

class PathwayController {
  createPathway = {
    middleware: [],
    action: async (req, res) => {
      const content = req.body;
      console.log("Registering user with the credentials");
      await PathwayService.create(content)
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
          await PathwayService.get(req.query)
          .then((result) => {
            res.status(200).send({message: result.message})
          })
          .catch((err) => {
            res.status(500).send({ error: err.message })
          })
      }
  }

  putCourseToPathway = {
    middleware: [],
    action: async (req, res) => {
      const id = req.params.id
      const course = req.body
      console.log('Adding the course to the pathway using ID')
      await PathwayService.addNewCourseToPathway(id, course)
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
    action : async (req, res) => {
      const id = req.params.id
      console.log('Fetching the specified pathway')
      await PathwayService.getPathByID(id)
      .then((result) => {
        res.status(200).send({message : result.message})
      })
      .catch((err) => {
        res.status(500).send({ error: err })
      })
    }
  }

  createNewCourse = {
    middleware: [],
    action : async (req, res) => {
      console.log('Creating new Course')
      await PathwayService.createCourse(req.body)
      .then((result) => {
        res.status(201).send({ message: result.message})
      })
      .catch((err) => {
        res.status(500).send({ error: err })
      })
    }
  }

  getAllCourse = {
    middleware: [],
    action : async (req, res) => {
      console.log('Getting all Courses from DB')
      await PathwayService.getAllCourse(req.query)
      .then((result) => {
        res.status(200).send({ message: result.message})
      })
      .catch((err) => {
        res.status(500).send({error: err})
      })
    }
  }

  addCourseToPathway = {
    middleware: [],
    action : async (req, res) => {
      console.log('Attaching Course to the specified pathway')
      await PathwayService.addExistingToPathway(req.params.id, req.body)
      .then((result) => {
        res.status(200).send({ result: result.message})
      })
      .catch((err) => {
        res.status(500).send({error: err})
      })
    }
  }

  viewCourseOnPathway = {
    middleware: [],
    action : async (req, res) => {
      console.log('Populating the specified pathway with the courses')
      await PathwayService.viewCourseOnPathway(req.params.id)
      .then((result) => {
        res.status(200).send({data: result})
      })
      .catch((err) => {
        res.status(500).send({error: err})
      })
    }
  }


}

module.exports = new PathwayController();
