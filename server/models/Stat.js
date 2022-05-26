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
    quizesCompleted: {
      type: Number,
    },
    questionsAnswered: {
      type: Number,
    },
    correctAnswers: {
      type: Number,
    },
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

const Stat = model("Stat", statSchema);
module.exports = Stat;
