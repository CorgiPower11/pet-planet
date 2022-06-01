const { User, Stat, Pet } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { findOneAndUpdate } = require("../models/User");

const resolvers = {
  Query: {
    me: async (paret, args, context) => {
      if (context.user) {
        // If a user's context is authorized find that user by there ID
        const userData = await User.findOne({ _id: context.user_id })
          .select("-__v -password") //Do not return their password
          .populate("pet"); // populate their pet array

        return userData; // return the full userData
      }

      throw new AuthenticationError("Not logged in");
    },

    stat: async (parent, { _id }) => {
      return Stat.findOne({ _id });
    },
    pet: async (parent, { _id }) => {
      return Pet.findOne({ _id });
    },

    users: async () => {
      // Get all users, their stats and their pet
      return User.find()
        .select("-__v -password") // Do not return their password
        .populate("pet"); // populate their pet array
    },

    user: async (parent, { username }) => {
      // get a single user by their username
      return User.findOne({ username })
        .select("-__v -password") // Do not return their password
        .populate("pet"); // populate their pet array
    },
  },
  Mutation: {
    // expects username, email and password
    createUser: async (parent, args) => {
      // Create a new User with data passed in the args
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user }; // return the token and user
    },
    createStat: async (parent, args) => {
      // expects username
      const username = args.username;
      console.log(args);
      const stat = await Stat.create({
        username: username,
        pointsEarned: 0,
        pointsBanked: 0,
        quizesCompleted: 0,
        questionsAnswered: 0,
        correctAnswers: 0,
      });

      console.log("This is the stat ID", stat._id);

      await User.findOneAndUpdate(
        { username: username },
        { stats: stat._id } // Push the objectId of the new Stat object into the users stats array
      );

      return stat;
    },
    createPet: async (parent, args, context) => {
      // expects username, petName, petType
      petCreated = new Date();
      console.log(petCreated);
      const pet = await Pet.create({
        username: args.username,
        petName: args.petName,
        petType: args.petType,
        lastFed: petCreated, // intialize to timestamp of creation
        hunger: 100, // high is good?
        thirst: 100, // high is good?
        affection: 50, // middle of range
        imgName: args.imgName,
      });

      console.log(pet);
      await User.findOneAndUpdate(
        { username: args.username },
        { $push: { pet: pet._id } }, // Push the objectId of the new Pet object into the users pet array
        { new: true }
      );

      return pet;
    },
    updateUser: async (parent, args) => {
      // unfinsihed, if we have time we can add an option to update email and password
      return User.findByIdAndUpdate(context.user._id, args);

      throw new AuthenticationError(
        "You must be logged in to change your profile."
      );
    },
    updateStat: async (parent, args) => {
      // Expects statId: String!, difficulty: String!, correctAnswers: Int!, quizLength: Int!
      // get pre-update user stat block
      const oldStats = await Stat.findById(args.statId);

      let points = 0;
      // Calculate points earned on quiz
      if ((args.difficulty = "Hard")) {
        points = 3 * args.correctAnswers;
      } else if ((args.difficulty = "Medium")) {
        points = 2 * args.correctAnswers;
      } else {
        points = args.correctAnswers;
      }
      const statId = args.statId;
      const newPointsEarned = points + oldStats.pointsEarned;
      const newPointsBanked = points + oldStats.pointsBanked;
      const newQuizesCompleted = oldStats.quizesCompleted + 1;
      const newQuestionsAnswered = oldStats.questionsAnswered + args.quizLength;
      const newCorrectAnswers = oldStats.correctAnswers + args.correctAnswers;

      // get users stat block by statId and update it
      return await Stat.findOneAndUpdate(
        { _id: statId },
        {
          pointsEarned: newPointsEarned,
          pointsBanked: newPointsBanked,
          quizesCompleted: newQuizesCompleted,
          questionsAnswered: newQuestionsAnswered,
          correctAnswers: newCorrectAnswers,
        },
        { new: true }
      );
    },
    nurishPet: async (parent, args) => {
      // expects petId: String!, fed: Int, drank: Int, playedWith: Int
      // When the user submits their feeding, watering, play with pet this will trigger to update the pets stats.
      const petId = args.petId;
      const oldPet = await Pet.findById(petId); // get the pre-feeding stats

      let newHunger = 0;
      let newThirst = 0;
      let newAffection = 0;

      // if else checks so no stat goes above its upper limit
      if (oldPet.hunger + args.fed > 100) {
        newHunger = 100;
      } else {
        newHunger = oldPet.hunger + args.fed;
      }

      if (oldPet.thirst + args.drank > 100) {
        newThirst = 100;
      } else {
        newThirst = oldPet.thirst + args.drank;
      }

      if (oldPet.affection + args.playedWith > 100) {
        newAffection = 100;
      } else {
        newAffection = oldPet.affection + args.playedWith;
      }

      // pull new time stamp
      const newLastFed = new Date();
      // find by petId and update the pet
      return await Pet.findOneAndUpdate(
        { _id: petId },
        {
          hunger: newHunger,
          thirst: newThirst,
          affection: newAffection,
          lastFed: newLastFed,
        },
        { new: true }
      );
    },
    decayPetNeeds: async (parent, args) => {
      // expects petId: String!
      // This can get called on login. It will compare the timestamp of login vs timestamp of lastFeeding and adjust accordingly
      const petId = args.petId;
      const oldPet = await Pet.findById(petId); // get the pre-feeding stats
      const lastFedAt = oldPet.lastFed; // bring in prior feeding time
      const lastFedAtMs = Date.parse(lastFedAt); // pares to milliseconds
      const currentDate = new Date(); // create new date for lastFed
      const currentDateMs = Date.parse(currentDate); // pares to milliseconds
      /* 
      // Time testing logs
      console.log("break");
      console.log("lastFedAt", lastFedAt)
      console.log("lastFedAtMs", lastFedAtMs)
      console.log("currentDate", currentDate)
      console.log("currentDateMs", currentDateMs);
      Math.round(Math.abs(currentDateMs - lastFedAtMs) / 3600000)*/
      // 1 h = 3600000 ms

      // This will calculate difference in milliseconds, divides to find hours passed as decimal and rounds to the nearest integer
      const hoursSinceLastFeeding = Math.round(
        Math.abs(currentDateMs - lastFedAtMs) / 3600000
      );
      // console.log(hoursSinceLastFeeding);

      // may need to add check incase no time has passed
      const needReductionMultiplier = 2; // We can assign this to whatever we like or make different multipliers for each need
      const newHunger =
        oldPet.hunger - hoursSinceLastFeeding * needReductionMultiplier;
      const newThirst =
        oldPet.hunger - hoursSinceLastFeeding * needReductionMultiplier;
      const newAffection =
        oldPet.hunger - hoursSinceLastFeeding * needReductionMultiplier;

      return await Pet.findOneAndUpdate(
        { _id: petId },
        {
          hunger: newHunger,
          thirst: newThirst,
          affection: newAffection,
        },
        { new: true }
      );
    },
    login: async (parent, { email, password }) => {
      // find a user by their email
      const user = await User.findOne({ email });
      // if there is no user with that email advise the user
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      // if there is a user with that email then use the isCorrectPassword method of the User model to return a boolean
      const correctPw = await user.isCorrectPassword(password);
      // If password is incorrect advise user
      if (!correctPw) {
        throw new AuthenticationError("incorrect credentials");
      }
      // If credentials are correct provide a JWT token to the logged in user and return the token and the user found at the begining of the function
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
