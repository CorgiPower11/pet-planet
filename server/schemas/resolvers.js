const { User, Stat, Pet } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (paret, args, context) => {
      if (context.user) {
        // If a user's context is authorized find that user by there ID
        const userData = await User.findOne({ _id: context.user_id })
          .select("-__v -password") //Do not return their password
          .populate("stats") // populate their stats array
          .populate("pet"); // populate their pet array

        return userData; // return the full userData
      }

      throw new AuthenticationError("Not logged in");
    },

    stats: async (parent, { username }) => {
      const params = username ? { username } : {}; // If there is username passed set params to that; else set it to an empty object
      return Stat.findOne(params); // use the defined params varaible to search for a users Stat data and return it.  username is a unique field in this app.
    },

    pet: async (parent, { username }) => {
      // Find a users pet by their username and return it.
      const params = username ? { username } : {};
      return Pet.findOne(params);
    },

    users: async () => {
      // Get all users, their stats and their pet
      return User.find()
        .select("-__v -password") // Do not return their password
        .populate("stats") // populate their stats array
        .populate("pet"); // populate their pet array
    },

    user: async (parent, { username }) => {
      // get a single user by their username
      return User.findOne({ username })
        .select("-__v -password") // Do not return their password
        .populate("stats") // populate their stats array
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
        { stats: stat._id }, // Push the objectId of the new Stat object into the users stats array
      );

      return stat;
    },
    createPet: async (parent, args) => {
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
      });

      console.log(pet);
      await User.findOneAndUpdate(
        { username: args.username },
        { $push: { pet: pet._id } }, // Push the objectId of the new Pet object into the users stats array
        { new: true }
      );

      return pet;
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

/*
    createUser: async (parent, args) => {
      // Create a new User with data passed in the args
      const user = await User.create(args);
      const token = signToken(user);

      const username = args.username;
      console.log(args);
      // create the users Stat and Pet object as part of the createUser mutation
      // User doesnt have the logged in context untila fter createUser runs, so use the args to create their Stat and Pet objects
      const stat = await Stat.create({
        username: username,
        pointsEarned: 0,
        quizesCompleted: 0,
        questionsAnswered: 0,
        correctAnswers: 0,
      });
      console.log(stat._id);
      await User.findOne(
        { username: username },
        { $push: { pet: stat._id } }, // Push the objectId of the new Stat object into the users stats array
        { new: true }
      );

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
      });

      console.log(pet);
      await User.findOne(
        { username: username },
        { $push: { stats: pet._id } }, // Push the objectId of the new Pet object into the users stats array
        { new: true }
      );

      return { token, user, stat, pet }; // return the token and user
    },
*/
