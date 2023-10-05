import { createSlice } from "@reduxjs/toolkit";
import { IRootState, IStreams } from "../types";
const initialState: IRootState['streams'] =  {
  remoteStreams: []
}
const streamsSlice = createSlice({
  name: 'streams',
  initialState,
  reducers: {
    addStream: ((state, action) => {
      state.remoteStreams.push(action.payload);
    }),
    removeStream: ((state, action)=>{
      state.remoteStreams = state.remoteStreams.filter((stream) => {
        return !stream!==action.payload
      });
    })
  }
});

export const { addStream, removeStream } = streamsSlice.actions;

export default streamsSlice.reducer;
