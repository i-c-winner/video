import { configureStore } from '@reduxjs/toolkit';
import sourceReducer from './sourceSlice';
import chatsReducer from './chatsSlice'
import interfaceReducer from './interfaceSlice';

const store = configureStore({
  reducer: {
    source: sourceReducer,
    chats: chatsReducer,
    interface: interfaceReducer
  }
});

export { store };
