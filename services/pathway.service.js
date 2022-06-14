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

  addExistingToPathway = async (_id, _body) => {
    const pathwayID = _id;
    const course = _body
    try {
      const selectedPathway = await Pathway.findById(pathwayID);
      arr.push(course);
      await Pathway.findByIdAndUpdate( pathwayID, {
        courses: arr,
      });
      return { message: 'Added to pathway'}
    } catch (err) {
      return {
        message: `Error occured while attaching the Course to pathway ${err}`,
      };
    }
  };

  getPathByID = async (id) => {
    const pathwayID = id;
    try {
      const content = await Pathway.findById(pathwayID)
      .populate("courses")
      .exec();
      return { message: content };
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

  addNewCourseToPathway = async (_id, _body) => {
    const course = _body
    const pathway = _id;

    console.log(pathway,course);
    try {
      const selectedPathway = await Pathway.findById(pathway);
      arr.push(course._id);
      await Pathway.findByIdAndUpdate(pathway, {
        courses: arr,
      });
      await Course.create(_body);
      return { message: 'Added to pathway'}
    } catch (err) {
      return {
        message: `Error occured while attaching the Course to pathway ${err}`,
      };
    }
  };

  viewCourseOnPathway = async (_id) => {
    const pathwayID = _id;
    let result;
    try {
      result = await Pathway.findOne({ _id: pathwayID })
        .populate("courses")
        .exec();  
      return result;
    } catch (err) {
      return { message: `Error occured while adding the data ${err} ` };
    }
  };
}

module.exports = new PathwayService();
