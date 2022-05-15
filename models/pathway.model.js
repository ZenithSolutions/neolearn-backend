const mongoose = require('mongoose')

const PathwaySchema = mongoose.Schema({
    pathwayName : {
        type: String,
        required : true
    },

    pathwayCost : {
        type : Number,
    },
    pathwayDuration : {
        type : String,
        required : true
    },
    curatedBy : {
        type : String,
        required : true
    },
    personDesignation : {
        type : String,
        requried : true
    },
    courses : {
        type : Array,
        schema : {
            courseName : {
                type : String,
                required : true
            },
            courseDuration : {
                type : String,
                required : true
            },
            courseCost : {
                type : Number,
                required : true
            },
            description : {
                type : String,
                required : true
            },
            link : {
                type : String,
                required : true
            },
            image : {
                type : String,
                required : true
            },
            level : {
                type : String,
                required : true
            }
        }
    }
})

module.exports = mongoose.model('Pathway', PathwaySchema)