import { configureStore } from "@reduxjs/toolkit";
import streamsSlice from "./streamsSlice";
import configSlice from "./configSlice";
import chatSlice from './chatSlice';

const store = configureStore({
  reducer: {
    streams: streamsSlice,
    config: configSlice,
    chat: chatSlice
  }
})
export { store }
