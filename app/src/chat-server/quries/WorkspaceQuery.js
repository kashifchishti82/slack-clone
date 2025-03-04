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
        channels(workspace_id: $workspaceId) {
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