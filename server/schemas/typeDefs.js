const { gql } = require("apollo-server-express");
/*
Look over ME query in office hours, think I got the syntax wrong.  Looking to retun User object, Pet object or Stat object for the logged in user

*/
const typeDefs = gwl`
type Auth {
    token: ID!
    user: User
  }

  type User {
      _id: ID
      username: String
      email: String
      points: Number
      quizesAttempted: Number
      correctAnswers: Number
      stats: [Stat]
      pet: [Pet]
  }

  type Query {
      me: User
      users: [User]
      user(username: String!): User
      pet(username: String): [Pet]
      stats(username: String): [Stat]
  }

  type Stat {
    _id: ID
    username: String
    pointsEarned: Number
    quizesCompleted: Number
    questionsAnswered: Number
    correctAnswers: Number
  }

  type Pet {
    _id: ID
    username: String
    petName: String
    petType: String
    lastFed: Date
    hunger: Number
    thirst: Number
    affection: Number
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    createPet(username: String!, petName: String!, petType: String!): Pet
    createStat(username: String!): Stat
  }

`;

module.exports = typeDefs;
