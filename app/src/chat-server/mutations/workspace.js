import {gql} from "@apollo/client";

const CREATE_WORKSPACE_MUTATION = gql`
    mutation CreateWorkspace($name: String!, $description: String!) {
        createWorkspace(name: $name, description: $description) {
            id
            name
            description
            created_at
            updated_at
        }
    }
`
const CREATE_CHANNEL_MUTATION = gql`
    mutation CreateChannel($name: String!, $workspaceId: ID!, $is_private: Boolean!, $description: String, $is_default: Boolean) {
        createChannel(name: $name, workspaceId: $workspaceId, is_private: $is_private, description: $description, is_default: $is_default) {
            id
            name
            slug
            description
            created_at
            updated_at
            image
            is_private
            is_archived
            is_default
            is_read_only
        }
    }
`
export {CREATE_WORKSPACE_MUTATION, CREATE_CHANNEL_MUTATION}