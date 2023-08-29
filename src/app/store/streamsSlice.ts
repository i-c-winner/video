import {createSlice} from "@reduxjs/toolkit";
import {IStreams} from "../types";
const initialState: IStreams={
  streams: []
}


const streamsSlice=createSlice({
  name: 'streams',
  initialState,
  reducers: {
    addStream: ((state: IStreams, action)=>{
      state.streams.push(action.payload)
    }),
    removeStream: ((state: IStreams, action)=>{
      state.streams.filter((stream)=>{
        return stream!==action.payload
      })
    })
  }
})

export const {addStream, removeStream} =streamsSlice.actions

export default  streamsSlice.reducer
