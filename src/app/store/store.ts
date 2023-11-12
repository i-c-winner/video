import { configureStore } from '@reduxjs/toolkit';
import sourceReducer from './sourceSlice';

const store = configureStore({
  reducer: {
    source: sourceReducer
  }
});

export { store };
