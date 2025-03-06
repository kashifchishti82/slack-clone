import {configureStore} from "@reduxjs/toolkit"
import UserReducer from "./userSlice"
import WorkspaceReducer from "./workspaceSlice"
import ChannelReducer from "./channelSlice"


const store = configureStore({
    reducer: {
        user: UserReducer,
        workspace: WorkspaceReducer,
        channel: ChannelReducer
    }
});

export default store;