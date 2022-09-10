const mongoose = require("mongoose");

const PathwaySchema = mongoose.Schema({

  pathwayName: {
    type: String,
  },

  profilePic: {
    type: String,
  },

  pathwayType: {
    type: String,
    enum: [
      "Programming",
      "Web development",
      "App development",
      "Design",
      "Product Management",
      "Data Science/AI/ML",
      "Blockchain",
      "Management",
      "Marketing",
    ],
  },

  linkedinUrl: {
    type: String,
  },

  topmateUrl: {
    type: String,
  },

  twitterUrl: {
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

  pathwayKey: {
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

      courseKey: {
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
