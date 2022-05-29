// Model to store a users stats in a separate model which is related to User

const { Schema, model } = require("mongoose");

// in typeDefs require just the username to create and empty Stat block

const statSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    pointsEarned: {
      type: Number,
    },
    pointsBanked: {
      type: Number,
    },
    quizesCompleted: {
      type: Number,
    },
    questionsAnswered: {
      type: Number,
    },
    correctAnswers: {
      type: Number,
    }, // could add reference to lowest score on leadr board as an easy check to see  if the leaderboard needs to recalculate
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// uses correctAnsers and questionsAnswered to calculate the percent of questions answered correctly as a decimal. Can be parsed to percent on the front end
statSchema.virtual("percentCorrect").get(function () {
  return this.correctAnswers / questionsAnswered;
});

// Virtual to check if user has made it onto the leaderboard
statSchema.virtual("leaderboardCheck").get(function () {
  if (this.pointsEarned > this.lowestScoreOnLeaderboard) {
    return true;
  } else {
    return false;
  }
});

const Stat = model("Stat", statSchema);
module.exports = Stat;
