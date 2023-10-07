import { configureStore } from "@reduxjs/toolkit";
import configSlice from "./configSlice";
import chatSlice from './chatSlice';

const store = configureStore({
  reducer: {
    config: configSlice,
    chat: chatSlice
  }
})
export { store }
