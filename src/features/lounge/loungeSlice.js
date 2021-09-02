import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../api/client'
const initialState = {
  contacts: [],
  status: 'idle',
  error: {},
  activeChat: '',
  activeChats: []
}

export const fetchChat = createAsyncThunk(
  'lounge/fetchChat',
  ({ url, authToken }) => client.get(url, {
    headers: {
      Authorization: authToken
    }
  })
)

export const getChatList = createAsyncThunk(
  'lounge/getChatList',
  ({ url, authToken, id }) => client.get(url, {
    headers: {
      Authorization: authToken
    }
  })
)

const loungeSlice = createSlice({
  name: 'lounge',
  initialState,
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload
    }
  },
  extraReducers: builder => builder.addCase(fetchChat.pending, (state) => {
    state.status = 'pending'
  }).addCase(fetchChat.fulfilled, (state, action) => {
    state.status = 'idle'
    state.contacts = action.payload.contacts
  }).addCase(fetchChat.rejected, (state, action) => {
    state.status = 'idle'
    state.error = action.error
  }).addCase(getChatList.pending, (state) => {
    state.status = 'pending'
  }).addCase(getChatList.fulfilled, (state, action) => {
    state.status = 'idle'
    state.activeChats = action.payload.chats
  }).addCase(getChatList.rejected, (state, action) => {
    state.status = 'idle'
    state.error = action.error
  })

})

export const { setActiveChat } = loungeSlice.actions

export default loungeSlice.reducer
