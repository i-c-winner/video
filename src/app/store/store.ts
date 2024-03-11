import { configureStore } from '@reduxjs/toolkit';
import chatsReducer from './chatsSlice'
import interfaceReducer from './interfaceSlice';
import filesSlice from './filesSlice';

const store = configureStore({
  reducer: {
    chats: chatsReducer,
    interface: interfaceReducer,
    files: filesSlice
  }
});

export { store };
