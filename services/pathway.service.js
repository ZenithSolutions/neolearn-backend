const { Pathway, Course } = require("../models/pathway.model");
const { ObjectId } = require("mongodb");
const res = require("express/lib/response");

let arr = [];

let newCourse;

class PathwayService {
  create = async (_body) => {
    console.log("Creating a course pathway for the curator");
    const body = _body;
    try {
      await Pathway.create(body);
      return { message: "Pathway added to DB" };
    } catch (err) {
      return { message: `Error occured while storing in DB ${err}` };
    }
  };

  get = async () => {
    console.log("Fetching data from Database");
    this.offset = 10;
    this.queryLimit = 10;

    const query = {};

    try {
      const pathway = await Pathway.find(query);
      return { message: pathway };
    } catch (err) {
      return {
        message: `Error occured while fetching the data from the DB ${err}`,
      };
    }
  };

  addContent = async (id, body) => {
    const pathwayID = id;
    try {
      await Pathway.findByIdAndUpdate(
        pathwayID,
        { $addToSet: { courses: body } },
        async (err, result) => {
          if (err) return err;
          return { message: `${result} the course has been added` };
        }
      );
    } catch (err) {
      return { message: `Error occured while updating the pathway ${err}` };
    }
  };

  getPathByID = async (id) => {
    const pathwayID = id;
    try {
      const content = await Pathway.findById(id);
      return { message: `Pathway ${content}` };
    } catch (err) {
      return { message: `Error occured while fetching path ${err}` };
    }
  };

  createCourse = async (_body) => {
    console.log("Creating a course ");
    const body = _body;
    try {
      newCourse = await Course.create(body);
      return { message: "Course created successfully!" };
    } catch (err) {
      return { message: `Error occured while storing in DB ${err}` };
    }
  };

  getAllCourse = async () => {
    console.log("Fetching Coursedata from Database");
    this.offset = 10;
    this.queryLimit = 10;

    const query = {};

    try {
      const Courses = await Course.find(query);
      return { message: Courses };
    } catch (err) {
      return {
        message: `Error occured while fetching the data from the DB ${err}`,
      };
    }
  };

  addCourseToPathway = async (_id, _body) => {
    const course = ObjectId(_body._id);
    const pathway = _id;

    console.log("Coming in");
    try {
      const selectedPathway = await Pathway.findById(pathway);
      console.log({ selectedPathway });
      console.log(selectedPathway.courses[0]);
      const newar = arr.push(course);
      console.log(arr);
      await Pathway.findByIdAndUpdate(pathway, {
        courses: arr,
      });
      await Course.create(_body);
      return { message: `Course has been added to pathway` };
    } catch (err) {
      return {
        message: `Error occured while attaching the Course to pathway ${err}`,
      };
    }
  };

  viewCourseOnPathway = async (_id) => {
    console.log(_id);
    const pathwayID = _id;
    let someCourse;
    let result;
    try {
      result = await Pathway.findOne({ _id: pathwayID })
        .skip(0)
        .limit(15)
        .populate("courses")
        .exec();
      return result;
    } catch (err) {
      return { message: `Error occured while adding the data ${err} ` };
    }
  };
}

module.exports = new PathwayService();
