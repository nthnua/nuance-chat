import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import loungeSlice from '../features/lounge/loungeSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    lounge: loungeSlice
  }
})
