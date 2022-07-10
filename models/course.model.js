const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({

    platformName: {
        type: String
    },

    ratings: {
        type: Number
    },

    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Professional']
    },

    CTALink: {
        type: String
    },

    courseDescription: {
        type: String
    },

    courseCategory : {
        type : String,
    },

    courseOrigin: {
        type : String,
    },

    coursePic: {
        type : String,
    },

    courseName: {
        type : String,
    },

    courseDuration: {
        type: String
    },
})

const Course = mongoose.model('Course', CourseSchema)

module.exports = { Course }