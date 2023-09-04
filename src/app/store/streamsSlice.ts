import {createSlice} from "@reduxjs/toolkit";
import {IStreams} from "../types";
const initialState: IStreams={
  streamsId: []
}


const streamsSlice=createSlice({
  name: 'streams',
  initialState,
  reducers: {
    addStream: ((state: IStreams, action)=>{
      function hasId(id:string) {
        return state.streamsId.includes(id)
      }
      const id=action.payload
        if (!hasId(id)) {
          state.streamsId.push(id)
        }
    }),
    removeStream: ((state: IStreams, action)=>{
      state.streamsId=state.streamsId.filter((stream)=>{
        return stream!==action.payload
      })
    })
  }
})

export const {addStream, removeStream} =streamsSlice.actions

export default  streamsSlice.reducer
