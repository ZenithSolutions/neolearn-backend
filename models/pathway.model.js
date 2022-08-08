const mongoose = require("mongoose");

const PathwaySchema = mongoose.Schema({

  pathwayName: {
    type: String,
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

  pathwayCost: {
    type: String,
  },
  pathwayDescription: {
    type: String,
  },

  rating: {
    type: Number,
  },

  difficulty: {
    type: String,
  },

  curatedBy: {
    type: String,
  },
  personDesignation: {
    type: String,
  },
  courses: [
    {
      platformName: {
        type: String,
      },

      ratings: {
        type: Number,
      },

      difficulty: {
        type: String,
        enum: ["Beginner", "Intermediate", "Professional"],
      },

      CTALink: {
        type: String,
      },

      courseDescription: {
        type: String,
      },

      courseCategory: {
        type: String,
      },

      courseOrigin: {
        type: String,
      },

      coursePic: {
        type: String,
      },

      courseName: {
        type: String,
      },

      courseDuration: {
        type: String,
      },
    },
  ],
});

const Pathway = mongoose.model("Pathway", PathwaySchema);

module.exports = { Pathway };
