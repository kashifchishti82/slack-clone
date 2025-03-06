import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    channels: [],
    activeChannel: null,
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
    }
});

export const { setChannels, setActiveChannel } = channelSlice.actions;
export default channelSlice.reducer;