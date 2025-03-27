import {gql} from "@apollo/client";

const GET_AUTH_USER = gql`
    query GetAuthUser {
        me {
            email
            id
            name
        }
    }
`;


export {
    GET_AUTH_USER
}