import { createSlice } from "@reduxjs/toolkit";
import { config } from '../../shared/config/config';

const configSlice = createSlice({
  name: "config",
  initialState: config,
  reducers: {
    changeChatVisible: ((state: any) => {
      state.UI.chatBoxVisible = !state.UI.chatBoxVisible;
    }),
    setSelectedTab: ((state: any, action) => {
      state.settings.selectedTab = action.payload;
    }),
    setTypeModal: ((state, action) => {
      state.modal.type = action.payload;
    }),
    changeModalVisible: ((state: any, action) => {
      state.modal.openModal = action.payload;
    }),
    changeQuantityVideo: ((state: any, action) => {
      state.conference.videoQuantity = action.payload;
    }),
    changeTittle: ((state: any, action)=>{
      state.UI.tittle=action.payload
    })
  }
});
export const {
  changeChatVisible,
  setTypeModal,
  changeModalVisible,
  changeQuantityVideo,
  changeTittle
} = configSlice.actions;
export default configSlice.reducer;
