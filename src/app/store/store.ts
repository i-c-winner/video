import { configureStore } from "@reduxjs/toolkit";
import streamsSlice from "./streamsSlice";

const store = configureStore({
  reducer: {
    stream: streamsSlice
  }
})
export {store}
