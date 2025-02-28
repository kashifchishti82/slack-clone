import {gql} from "@apollo/client";
import {RESPONSE_FRAGMENT} from "@/chat-server/fregments/page";
const CREATE_WORKSPACE_MUTATION = gql`
    mutation CreateWorkspace($name: String!, $description: String!) {
        createWorkspace(name: $name, description: $description) {
            ${RESPONSE_FRAGMENT}
            id
            name
            description
            createdAt
            updatedAt
        }
    }
`
export { CREATE_WORKSPACE_MUTATION }