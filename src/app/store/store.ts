import { configureStore } from "@reduxjs/toolkit";
import streamsSlice from "./streamsSlice";

const store = configureStore({
  reducer: {
    streams: streamsSlice
  }
})
export { store }
