import { configureStore } from '@reduxjs/toolkit';
import sourceReducer from './sourceSlice';
import chatsReducer from './chatsSlice'
import interfaceReducer from './interfaceSlice';
import filesSlice from './filesSlice';

const store = configureStore({
  reducer: {
    source: sourceReducer,
    chats: chatsReducer,
    interface: interfaceReducer,
    files: filesSlice
  }
});

export { store };
