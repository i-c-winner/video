import {createSlice} from '@reduxjs/toolkit';
import { IStore } from '../types';
const initialState: IStore['files']={
  files: [{idRemote: 'ddd', file: 'ddd'},{idRemote: 'dddd', file: 'dddddd'}]
}

const filesSlice= createSlice({
  name: 'files',
  initialState,
  reducers: {
    addFile: ((state, action)=>{
     state.files.push(action.payload)
    }),
    removeFile: ((state, action)=>{
     state.files= state.files.filter((file)=>{
        return file.idRemote!==action.payload
      })
    }),
    clearFiles: ((state)=>{
      state.files=[]
    })
  }
})

export const {addFile, removeFile, clearFiles}= filesSlice.actions
export default filesSlice.reducer
