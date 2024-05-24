import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    files: [],
};
const filesSlice = createSlice({
    name: "files",
    initialState,
    reducers: {
        addFile: (state, action) => {
            state.files.push(action.payload);
        },
        removeFile: (state, action) => {
            state.files = state.files.filter((file) => {
                return file.text !== action.payload;
            });
        },
        clearFiles: (state) => {
            state.files = [];
        },
    },
});
export const { addFile, removeFile, clearFiles } = filesSlice.actions;
export default filesSlice.reducer;
