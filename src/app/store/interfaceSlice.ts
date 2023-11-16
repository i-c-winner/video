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
    changeToolboxVisible: ((state, action: PayloadAction<boolean>)=>{
      state.toolboxVisible=action.payload
    }),
    openModal: ((state, action: PayloadAction<boolean>)=>{
      state.modalIsOpen=action.payload
    }),
    changeTypeModal: ((state, action: PayloadAction<IInterface['typeModal']>)=>{
      state.typeModal=action.payload
    }),
    changeVideo:((state, action)=>{
      state.conference.quality.video=action.payload
    }),
    changeAudio:((state, action)=>{
      state.conference.quality.audio=action.payload
    })
  }
});

export const{changeChatsBox,changeTypeModal, changeToolboxVisible, changeAudio, changeVideo, openModal}=interfaceSlice.actions
export default interfaceSlice.reducer
