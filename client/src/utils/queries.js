import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      petName
      stats {
        _id
        username
        pointsEarned
        quizesCompleted
        questionsAnswered
        correctAnswers
      }
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
  query stat($username: String!) {
    stat(username: $username) {
      _id
      username
      pointsEarned
      quizesCompleted
      questionsAnswered
      correctAnswers
    }
  }
`;

export const QUERY_PET = gql`
  query pet($username: String!) {
    stat(username: $username) {
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
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      petName
      stats {
        _id
        username
        pointsEarned
        quizesCompleted
        questionsAnswered
        correctAnswers
      }
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
