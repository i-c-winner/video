import {configureStore} from '@reduxjs/toolkit';
import configSlice from './configSlice';
export const store = configureStore({
  reducer: {
    config: configSlice
  }
})
