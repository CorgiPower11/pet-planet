import { gql } from "@apollo/client";

/*
    Set a mutation needed to pull all data needed for the highscore page. We could define a 4th model which is just an array of usernames which are on the highscore page.  The array could be arrayed sequentially with highest at index zero.  Then when rendering the page it could request data on all those users.  could save runtime because the server doesn't have to calculate the users with highscores on every render
*/

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
// modified this so the users stat object and pet object are created as part of the CREATE_USER mutation
export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $password: String!
    $petName: String!
    $petType: String!
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      petName: $petName
      petType: $petType
    ) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
