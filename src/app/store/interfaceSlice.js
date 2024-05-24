import { createSlice } from "@reduxjs/toolkit";
import { config } from "../../shared/config";
const interfaceSlice = createSlice({
    name: "interfaceSlice",
    initialState: config,
    reducers: {
        changeChatsBox: (state, action) => {
            state.chatsBoxVisible = action.payload;
        },
        openModal: (state, action) => {
            state.modalIsOpen = action.payload;
        },
        changeTypeModal: (state, action) => {
            state.typeModal = action.payload;
        },
        changeVideo: (state, action) => {
            state.conference.quality.video = action.payload;
        },
        changeAudio: (state, action) => {
            state.conference.quality.audio = action.payload;
        },
        toggleTileMode: (state, action) => {
            state.tileMode = action.payload;
        },
        changeIsRecording: (state, action) => {
            state.isRecording = action.payload;
        },
        changeRemoteStreamsBox: (state, action) => {
            state.remoteBoxVisible = action.payload;
        },
    },
});
export const { changeChatsBox, changeTypeModal, toggleTileMode, changeAudio, changeVideo, openModal, changeIsRecording, changeRemoteStreamsBox, } = interfaceSlice.actions;
export default interfaceSlice.reducer;
