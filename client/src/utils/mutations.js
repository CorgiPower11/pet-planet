import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
/*
mutation createUser - This line defines what is being taken in from the frontend, matches to the value={formState.username} etc from the signup form page
2nd createUser this line passes the value into the createUser mutation on the backend
the remining lines define what is expected in the return statement. A jwt token, User._id and User.username
*/
export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_PET = gql`
  mutation createPet($username: String!, $petName: String!, $petType: String!) {
    createPet(username: $username, email: $email, password: $password) {
      _id
      pet {
        username
        petName
        petType
        lastFed
        hungerthirst
        affection
      }
    }
  }
`;

export const CREATE_STAT = gql`
  mutation createStat($username: String!) {
    createStat(username: $username) {
      _id
      stat {
        username
        pointsEarned
        quizesCompletedquestionsAnswered
        correctAnswers
      }
    }
  }
`;
