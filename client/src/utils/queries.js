import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      stats
      pet {
        _id
        username
        petName
        petType
        lastFed
        hunger
        thirst
        affection
      }
    }
  }
`;

// Get all users
export const QUERY_USERS = gql`
  query {
    users {
      _id
      username
      email
      stats
      pet {
        _id
        username
        petName
        petType
        lastFed
        hunger
        thirst
        affection
      }
    }
  }
`;

export const QUERY_STAT = gql`
  query stat($id: ID!) {
    stat(_id: $id) {
      _id
      username
      pointsEarned
      pointsBanked
      quizesCompleted
      questionsAnswered
      correctAnswers
    }
  }
`;

export const QUERY_PET = gql`
  query pet($id: ID!) {
    pet(_id: $id) {
      _id
      username
      petName
      petType
      lastFed
      hunger
      thirst
      affection
      imgName
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      petName
      stats
      pet {
        _id
        username
        petName
        petType
        lastFed
        hunger
        thirst
        affection
      }
    }
  }
`;
