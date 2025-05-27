import { gql } from "@apollo/client";

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
      workspace {
        id
        name
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

const GET_CHANNEL_MESSAGES = gql`
  query ChannelMessages($channel_id: ID!) {
    channelMessages(channel_id: $channel_id) {
      id
      name
      messages {
        id
        message
      }
    }
  }
`;
export { GET_WORKSPACES, GET_CHANNELS, GET_CHANNEL_MESSAGES };
