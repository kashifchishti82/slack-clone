import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    workspaces: [],
    activeWorkspace: null,
    loading: false,
    error: null,
};


const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        setWorkspaces: (state, action) => {
            state.workspaces = action.payload;
        },
        setActiveWorkspace: (state, action) => {
            state.activeWorkspace = action.payload;
        },
        addWorkspace: (state, action) => {
            state.workspaces.push(action.payload);
        },
        removeWorkspace: (state, action) => {
            state.workspaces = state.workspaces.filter(
                (workspace) => workspace.id !== action.payload
            );
        },
    }
});

export const {setWorkspaces, addWorkspace, removeWorkspace, setActiveWorkspace} = workspaceSlice.actions;

export default workspaceSlice.reducer;