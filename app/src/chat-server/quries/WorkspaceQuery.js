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
    query GetChannels($workspaceId: ID!, $page: Int!) {
        WorkspaceChannels(workspace_id: $workspaceId, page:$page) {
            data {
                id
                name
            }
        }
    }
`;

export {
    GET_WORKSPACES,
    GET_CHANNELS
}