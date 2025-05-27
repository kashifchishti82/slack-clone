
import {gql} from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id  
        name
        email
      }
    }
  }
`;



export {
  LOGIN_MUTATION
}