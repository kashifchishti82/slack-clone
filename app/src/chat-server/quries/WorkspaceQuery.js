import {gql} from "@apollo/client";

const GET_WORKSPACES = gql`
    query GetWorkspaces {
        workspaces {
            id
            name
        }
    }
`;

const GET_CHANNELS = gql`
    query GetChannels($workspaceId: ID!) {
        WorkspaceChannels(workspace_id: $workspaceId) {
            created_at
            id
            image
            is_archived
            is_private
            members {
                chat_id
                id
                user_id
            }
            name
            slug
            updated_at
            is_read_only
            is_default
            description
        }
    }
`;

export {
    GET_WORKSPACES,
    GET_CHANNELS
}