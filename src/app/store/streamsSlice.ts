import { createSlice } from "@reduxjs/toolkit";
import { IRootState, IStreams } from "../types";
const initialState: IRootState['streams'] = {
  streamsId: []
};
const streamsSlice = createSlice({
  name: 'streams',
  initialState,
  reducers: {
    addStream: ((state, action) => {
      state.streamsId.push(action.payload);
    }),
    removeStream: ((state: IStreams, action) => {
      state.streamsId = state.streamsId.filter((stream) => {
        return !stream.includes(action.payload)
      });
    })
  }
});

export const { addStream, removeStream } = streamsSlice.actions;

export default streamsSlice.reducer;
