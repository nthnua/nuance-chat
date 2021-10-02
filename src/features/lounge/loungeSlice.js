import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../api/client'
const initialState = {
  contacts: [],
  status: 'idle',
  error: {},
  socket: {
    id: '',
    status: ''
  },
  // activeChatMeta: {
  //   id: '',
  //   peerId: ''
  // },
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

export const socketConnected = createAsyncThunk(
  'lounge/socketConnected',
  ({ url, authToken, socketId }) => client.post(url, {
    socketId
  }, {
    headers: {
      Authorization: authToken
    }
  })
)

const loungeSlice = createSlice({
  name: 'lounge',
  initialState,
  reducers: {
    // setActiveChatMeta: (state, action) => {
    //   state.activeChatMeta.id = action.payload.id
    //   state.activeChatMeta.peerId = action.payload.peerId
    // },
    addChat: (state, action) => {
      state.contacts.forEach((contact, idx) => {
        if (contact.id === action.payload.chatId) {
          contact.chats = [...contact.chats, action.payload.data]
        }
      })
    },
    getActiveChat: (state, action) => {
      state.contacts.forEach((contact) => {
        if (contact.id === action.payload.chatId) {
          state.activeChat = contact.chats
        }
      })
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
  }).addCase(socketConnected.fulfilled, (state, action) => {
    state.socket.id = action.payload.socketId
  }).addCase(socketConnected.rejected, (state, action) => {
    state.socket.status = action.meta
    console.error('Error setting socketId', action.error)
  })

})

export const { addChat, getActiveChat } = loungeSlice.actions

export default loungeSlice.reducer
