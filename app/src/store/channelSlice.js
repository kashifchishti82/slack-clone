import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    channels: [],
    activeChannel: null,
    channelMessages: {},
    loading: false,
    error: null,
};

const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        setChannels: (state, action) => {
            state.channels = action.payload;
        },
        setActiveChannel: (state, action) => {
            state.activeChannel = action.payload;
        },
        setChannelMessages: (state, action) => {
            if(state.channelMessages[action.payload.channelId] === undefined){
                state.channelMessages[action.payload.channelId] = [];
            }
            state.channelMessages[action.payload.channelId].push(action.payload.messages);
        }
    }
});

export const { setChannels, setActiveChannel,setChannelMessages } = channelSlice.actions;
export default channelSlice.reducer;