import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../api/client'
const initialState = {
  contacts: [],
  status: 'idle',
  error: {},
  activeChatMeta: {
    id: '',
    peerId: ''
  },
  activeChat: []
}

export const fetchContacts = createAsyncThunk(
  'lounge/fetchContacts',
  ({ url, authToken }) => client.get(url, {
    headers: {
      Authorization: authToken
    }
  })
)

export const getChat = createAsyncThunk(
  'lounge/getChat',
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
    setActiveChatMeta: (state, action) => {
      state.activeChatMeta.id = action.payload.id
      state.activeChatMeta.peerId = action.payload.peerId
    },
    addChat: (state, action) => {
      state.activeChat = [...state.activeChat, action.payload]
    }
  },
  extraReducers: builder => builder.addCase(fetchContacts.pending, (state) => {
    state.status = 'pending'
  }).addCase(fetchContacts.fulfilled, (state, action) => {
    state.status = 'idle'
    state.contacts = action.payload.contacts
  }).addCase(fetchContacts.rejected, (state, action) => {
    state.status = 'idle'
    state.error = action.error
  }).addCase(getChat.pending, (state) => {
    state.status = 'pending'
  }).addCase(getChat.fulfilled, (state, action) => {
    state.status = 'idle'
    state.activeChat = action.payload.chats
  }).addCase(getChat.rejected, (state, action) => {
    state.status = 'idle'
    state.error = action.error
  })

})

export const { setActiveChatMeta, addChat } = loungeSlice.actions

export default loungeSlice.reducer
