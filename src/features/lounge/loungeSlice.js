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
  activeChatMeta: {
    id: '',
    msgCount: 0
  },
  activeChat: [],
  friendRequests: []
}

export const fetchContacts = createAsyncThunk(
  'lounge/fetchContacts',
  ({ url, authToken }) =>
    client.get(url, {
      headers: {
        Authorization: authToken
      }
    })
)

export const getChat = createAsyncThunk(
  'lounge/getChat',
  ({ url, authToken, id }) =>
    client.get(url, {
      headers: {
        Authorization: authToken
      }
    })
)

export const socketConnected = createAsyncThunk(
  'lounge/socketConnected',
  ({ url, authToken, socketId }) =>
    client.post(
      url,
      {
        socketId
      },
      {
        headers: {
          Authorization: authToken
        }
      }
    )
)

const loungeSlice = createSlice({
  name: 'lounge',
  initialState,
  reducers: {
    setActiveChatMeta: (state, action) => {
      state.activeChatMeta.id = action.payload.id
    },
    addChat: (state, action) => {
      // msgCount is client side
      state.contacts = state.contacts.map((contact, index) => {
        if (contact.id === action.payload.chatId) {
          contact.chats.unshift(action.payload.data)
          state.activeChatMeta.msgCount++
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
    addFriendRequest: (state, action) => {
      state.friendRequests.push(action.payload)
    },
    updateChats: (state, action) => {
      state.contacts = state.contacts.map((contact, index) => {
        if (contact.id === action.payload.chatId) {
          console.log(action.payload.data)
          contact.chats = action.payload.data.messages
          contact = {
            ...contact,
            msgCount: action.payload.data.msgCount
          }
          state.activeChatMeta.msgCount = action.payload.data.msgCount
        }
        return contact
      })
    },
    updateChatPart: (state, action) => {
      console.log(action.payload)
      state.contacts = state.contacts.map((contact, index) => {
        console.log(contact.id, action.payload.reciever)
        if (contact.id === action.payload.reciever) {
          // const olderMsgs = action.payload.messages.reverse()
          contact.chats.push(...action.payload.messages)
        }
        return contact
      })
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
    },
    updateContacts: (state, action) => {
      state.contacts = action.payload.contacts
      state.contactsStatus = 'loaded'
    },
    removeFriendRequest: (state, action) => {
      console.log(action.payload)
      state.friendRequests = state.friendRequests.filter(
        (friendReq) => friendReq._id !== action.payload._id
      )
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'pending'
        state.contactsStatus = 'pending'
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'idle'
        state.contactsStatus = 'loaded'
        state.contacts = action.payload.contacts
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'idle'
        state.error = action.error
      })
      .addCase(getChat.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(getChat.fulfilled, (state, action) => {
        state.status = 'idle'
        state.activeChat = action.payload.chats
      })
      .addCase(getChat.rejected, (state, action) => {
        state.status = 'idle'
        state.error = action.error
      })
      .addCase(socketConnected.fulfilled, (state, action) => {
        state.socket.id = action.payload.socketId
      })
      .addCase(socketConnected.rejected, (state, action) => {
        state.socket.status = action.meta
        console.error('Error setting socketId', action.error)
      })
})

export const {
  addChat,
  getActiveChat,
  setActiveChatMeta,
  addContact,
  updateContacts,
  updateChats,
  addFriendRequest,
  removeFriendRequest,
  updateChatPart
} = loungeSlice.actions

export default loungeSlice.reducer
