const { Pathway } = require("../models/pathway.model");
const { Course } = require("../models/course.model");

let arr = [];

let newCourse;

class PathwayService {
  create = async (_body) => {
    console.log("Creating a course pathway for the curator");
    const body = _body;
    try {
      await Pathway.create(body);
      const courses = body.courses;
      for (const course of courses) {
        await Course.create(course);
      }
      return { message: "Pathway added to DB" };
    } catch (err) {
      return { message: `Error occured while storing in DB ${err}` };
    }
  };

  get = async (params) => {
    console.log("Fetching data from Database");
    const { offset, limit } = params;
    this.offset = offset || 0;
    this.queryLimit = limit || 10;

    let query = {};

    try {
      let pathway;

      if (params.search !== undefined) {
        const searchKey = new RegExp(params.search, "i");
        query = {
          $or: [{ pathwayName: searchKey }],
        };
      }

      pathway = await Pathway.find(query)
        .skip(parseInt(this.offset, 10))
        .limit(parseInt(this.queryLimit, 10))
        .lean();

      return { message: pathway };
    } catch (err) {
      return {
        message: `Error occured while fetching the data from the DB ${err}`,
      };
    }
  };

  addExistingToPathway = async (_id, _body) => {
    const pathwayID = _id;
    const course = _body;
    try {
      const selectedPathway = await Pathway.findById(pathwayID);
      arr.push(course);
      await Pathway.findByIdAndUpdate(pathwayID, {
        courses: arr,
      });
      return { message: "Added to pathway" };
    } catch (err) {
      return {
        message: `Error occured while attaching the Course to pathway ${err}`,
      };
    }
  };

  getMasterInOne = async (params) => {
    const { offset, limit } = params
    console.log("Fetching data from Database");
    this.offset =offset ||  0;
    this.queryLimit = limit || 10;

    let query = { masterInOne: true };

    try {
      let mio;
      mio = await Course.find(query)
        .skip(parseInt(this.offset, 10))
        .limit(parseInt(this.queryLimit, 10))
        .lean();
      return { message: mio };
    } catch (err) {
      return {
        message: `Error occurred while fetching the data from the DB ${err}`,
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

  getAllCourse = async (params) => {
    console.log("Fetching Coursedata from Database");
    const { offset, limit, data, search } = params;

    let query = {};
    this.offset = offset || 0;
    this.limit = limit || 10;

    try {
      if (search) {
        console.log(search);
        query = {
          $or: [{ courseName: search }],
        };
      }

      if (data !== undefined) {
        if (data === "mio") {
          query = {
            $or: [{ masterInOne: true }],
          };
        }
        if (data === "cs") {
          query = {
            $or: [{ courseSpecific: true }],
          };
        }
      }
      const Courses = await Course.find(query)
        .skip(parseInt(this.offset, 10))
        .limit(parseInt(this.queryLimit, 10))
        .lean();
      return { message: Courses };
    } catch (err) {
      return {
        message: `Error occured while fetching the data from the DB ${err}`,
      };
    }
  };

  addNewCourseToPathway = async (_id, _body) => {
    const course = _body;
    const pathwayID = _id;
    console.log(course, pathwayID);
    try {
      const data = await Pathway.findByIdAndUpdate(
        pathwayID,
        { $push: { courses: course } },
        { new: true, upsert: true }
      );
      return { message: data };
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
