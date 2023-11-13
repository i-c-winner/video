import { configureStore } from '@reduxjs/toolkit';
import sourceReducer from './sourceSlice';
import chatsReducer from './chatsSlice'

const store = configureStore({
  reducer: {
    source: sourceReducer,
    chats: chatsReducer
  }
});

export { store };
