import { createSlice } from "@reduxjs/toolkit";
import { config } from '../../shared/config/config';

const configSlice = createSlice({
  name: "confgi",
  initialState: config,
  reducers: {

  }
})
export const{}=configSlice.actions
export default configSlice.reducer
