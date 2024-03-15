import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { config } from '../../shared/config';
import { IInterface } from '../types';

const interfaceSlice = createSlice({
  name: 'interfaceSlice',
  initialState: config as IInterface,
  reducers: {
    changeChatsBox: ((state, action: PayloadAction<boolean>) => {
        state.chatsBoxVisible = action.payload;
      }
    ),
    openModal: ((state, action: PayloadAction<boolean>) => {
      state.modalIsOpen = action.payload;
    }),
    changeTypeModal: ((state, action: PayloadAction<IInterface['typeModal']>) => {
      state.typeModal = action.payload;
    }),
    changeVideo: ((state, action) => {
      state.conference.quality.video = action.payload;
    }),
    changeAudio: ((state, action) => {
      state.conference.quality.audio = action.payload;
    }),
    toggleTileMode: ((state, action: PayloadAction<boolean>) => {
      state.tileMode = action.payload;
    }),
    changeIsRecording: ((state, action) => {
      state.isRecording = action.payload;
    }),
    changeRemoteStreamsBox: ((state, action)=>{
      state.remoteBoxVisible=action.payload
    }),
  }
});

export const {
  changeChatsBox,
  changeTypeModal,
  toggleTileMode,
  changeAudio,
  changeVideo,
  openModal,
  changeIsRecording,
  changeRemoteStreamsBox,
} = interfaceSlice.actions;
export default interfaceSlice.reducer;
