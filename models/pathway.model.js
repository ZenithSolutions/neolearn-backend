const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({

    _id: {type: mongoose.Schema.Types.ObjectId, required: true},

    courseCategory : {
        type : String,
        required : true
    },

    courseOrigin: {
        type : String,
        required : true
    },

    coursePic: {
        type : String,
    },

    courseName: {
        type : String,
        required : true
    },

    content : {
        type : mongoose.Schema.Types.Mixed
    }
})

const PathwaySchema = mongoose.Schema({

    _id: {
        type: String
    },

    pathwayName : {
        type: String,
        required : true
    },

    profilePic: {
        type: String,
    },

    companyPic: {
        type: String,
    },

    displayPic: {
        type: String,
    },

    pathwayCost : {
        type : Number,
    },
    pathwayDuration : {
        type : String
    },

    rating: {
        type: Number
    },

    difficulty: {
        type: String
    },

    curatedBy : {
        type : String,
        required : true
    },
    personDesignation : {
        type : String,
        requried : true
    },
    courses : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})



const Course = mongoose.model('Course', CourseSchema)
const Pathway = mongoose.model('Pathway', PathwaySchema)

module.exports = { Course, Pathway }