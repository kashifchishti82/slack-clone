
import {gql} from "@apollo/client";
import {RESPONSE_FRAGMENT} from "@/chat-server/fregments/page";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ${RESPONSE_FRAGMENT}
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