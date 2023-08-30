import { configureStore } from "@reduxjs/toolkit";
import streamsSlice from "./streamsSlice";
import configSlice from "./configSlice";

const store = configureStore({
  reducer: {
    streams: streamsSlice,
    config: configSlice
  }
})
export { store }
