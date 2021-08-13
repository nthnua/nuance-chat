import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/login/loginSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
