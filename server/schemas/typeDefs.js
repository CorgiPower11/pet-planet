const { gql } = require("apollo-server-express");
/*
Look over ME query in office hours, think I got the syntax wrong.  Looking to retun User object, Pet object or Stat object for the logged in user

*/
const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
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
    pointsEarned: Int
    pointsBanked: Int
    quizesCompleted: Int
    questionsAnswered: Int
    correctAnswers: Int
    lowestScoreOnLeaderboard: Int
  }

  type Pet {
    _id: ID
    username: String
    petName: String
    petType: String
    lastFed: String
    hunger: Int
    thirst: Int
    affection: Int
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(
      username: String!
      email: String!
      password: String!
    ): Auth
    createStat(username: String!): Stat
    createPet(username: String!, petName: String!, petType: String!): Pet
  }
`;

module.exports = typeDefs;
