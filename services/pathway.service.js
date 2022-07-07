const { Pathway } = require("../models/pathway.model");
const { Course } = require('../models/course.model')
const { ObjectId } = require("mongodb");
const res = require("express/lib/response");

let arr = [];

let newCourse;

class PathwayService {
  create = async (_body) => {
    console.log("Creating a course pathway for the curator");
    const body = _body;
    try {
      console.log(body)
      await Pathway.create(body);
      const courses = body.courses
      console.log(courses)
      for (const course of courses) {
        await Course.create(course)
      }
      return { message: "Pathway added to DB" };
    } catch (err) {
      return { message: `Error occured while storing in DB ${err}` };
    }
  };

  get = async (params) => {
    console.log("Fetching data from Database");
    this.offset = 10;
    this.queryLimit = 10;

    const query = {};

    try {
      console.log(params)
      const pathway = await Pathway.find(query);

      if(params.search) {
         const searchKey = new RegExp(params.search, 'i')
         query = {
          $or: [{ pathwayName: searchKey }]
         }
      }

      console.log(query)

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

  getAllCourse = async (params) => {
    console.log("Fetching Coursedata from Database");
    
    const query = {};
    query.offset = 0;
    query.limit = 10;

    try {
      console.log(params)
      if(params.search) {
        const searchKey = new RegExp(params.search, 'i')
        query = {
         $or: [{ courseName: searchKey}, { courseCategory: searchKey}, { courseOrigin: searchKey }]
        }
     }
     console.log(query)
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
    const pathwayID = _id;
    console.log(course, pathwayID)
    try {
      const data = await Pathway.findByIdAndUpdate(pathwayID,
        { $push: { "courses": course} },
        { "new": true, "upsert": true }
    );
    return { message: data }
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
