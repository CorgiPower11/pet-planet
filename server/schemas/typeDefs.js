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
    stats: ID
    pet: [Pet]
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    pet(_id: ID!): Pet
    stat(_id: ID!): Stat
  }

  type Stat {
    _id: ID
    username: String
    pointsEarned: Int
    pointsBanked: Int
    quizesCompleted: Int
    questionsAnswered: Int
    correctAnswers: Int
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
    imgName: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    createStat(username: String!): Stat
    createPet(username: String!, petName: String!, petType: String!, imgName: String!): Pet
    updateStat(statId: String!, difficulty: String!, correctAnswers: Int!, quizLength: Int!): Stat
    updateUser(username: String!, email: String, password: String): User
    nurishPet(petId: String!, fed: Int, drank: Int, playedWith: Int): Pet
    decayPetNeeds(petId: String!): Pet
  }
`;

module.exports = typeDefs;
/*
    updateStat(username: String!, difficulty: String!, correctAnswers: Int) : Stat
    updateUser(username: String!, email: String, password: String): User
    updatePet(username: String!, petName: String, lastFed: String, hunger: Int, thirst: Int, affection: Int): Pet

*/
