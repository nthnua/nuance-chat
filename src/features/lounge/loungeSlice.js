import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../api/client'
const initialState = {
  contacts: [],
  contactsStatus: 'initial',
  status: 'idle',
  error: {},
  socket: {
    id: '',
    status: ''
  },
  // activeChatMeta: {
  //   id: ''
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
    setActiveChatMeta: (state, action) => {
      state.activeChatMeta.id = action.payload.chatId
    },
    addChat: (state, action) => {
      state.contacts = state.contacts.map((contact, index) => {
        if (contact.id === action.payload.chatId) {
          contact.chats.push(action.payload.data)
        }
        return contact
      })
      // forEach((contact, index) => {
      //   console.log(contact, index)
      //   if (contact.id === action.payload.chatId) {
      //     console.log(contact.chats.push(action.payload.data))
      //     console.log(contact.chats)
      //   }
      // })
    },
    getActiveChat: (state, action) => {
      state.contacts.forEach((contact) => {
        if (contact.id === action.payload.chatId) {
          state.activeChat = contact.chats
        }
      })
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload)
    }

  },
  extraReducers: builder => builder.addCase(fetchContacts.pending, (state) => {
    state.status = 'pending'
    state.contactsStatus = 'pending'
  }).addCase(fetchContacts.fulfilled, (state, action) => {
    state.status = 'idle'
    state.contactsStatus = 'loaded'
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

export const { addChat, getActiveChat, addContact } = loungeSlice.actions

export default loungeSlice.reducer
