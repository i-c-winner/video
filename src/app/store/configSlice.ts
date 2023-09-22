import { createSlice } from "@reduxjs/toolkit";
import { config } from '../../shared/config/config';
import { IRootState } from '../types';

const configSlice = createSlice({
  name: "config",
  initialState: config,
  reducers: {
    changeChatVisible: ((state) => {
      state.UI.chatBoxVisible = !state.UI.chatBoxVisible;
    }),
    setTypeModal: ((state, action) => {
      state.modal.type = action.payload;
    }),
    changeModalVisible: ((state, action) => {
      state.modal.openModal = action.payload;
    }),
    changeQuantityVideo: ((state, action) => {
      state.conference.videoQuantity = action.payload;
    }),
    changeAudioStream: ((state, action)=>{
      state.conference.audioStream=action.payload
    }),
    changeTile: ((state, action)=>{
      state.UI.tile=action.payload
    }),
    changeSelectedTab: ((state, action)=>{
      state.modal.settings.selectedTab=action.payload
    }),
    changeIsRecording: ((state, action)=>{
      state.functions.isRecording=action.payload
    }),
    changeLeftOut: ((state)=>{
      state.conference.leftOut=true
    }),
    changeToolboxIsVisible: ((state, action)=>{
      state.UI.toolboxIsVisible=action.payload
    }),
    changeRemoteBoxIsVisible: ((state, action)=>{
      state.UI.remoteBoxIsVisible=action.payload
    }),
    changeSharingScreen: ((state, action)=>{
      state.UI.sharingScreen=action.payload
    })
  }
});
export const {
  changeChatVisible,
  setTypeModal,
  changeModalVisible,
  changeQuantityVideo,
  changeTile,
  changeAudioStream,
  changeSelectedTab,
  changeIsRecording,
  changeLeftOut,
  changeToolboxIsVisible,
  changeRemoteBoxIsVisible,
  changeSharingScreen
} = configSlice.actions;
export default configSlice.reducer;
