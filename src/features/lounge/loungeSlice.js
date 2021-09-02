import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../api/client'
const initialState = {
  contacts: [],
  connection: '',
  status: 'idle',
  error: {}
}

export const fetchChat = createAsyncThunk(
  'lounge/fetchChat',
  ({ url, authToken }) => client.get(url, {
    headers: {
      Authorization: authToken
    }
  })
)

export const sendPeerId = createAsyncThunk(
  'lounge/sendPeerId',
  ({ url, authToken, peerId }) => client.post(url, {
    peerId
  }, {
    headers: {
      Authorization: authToken
    }
  })
)

const loungeSlice = createSlice({
  name: 'lounge',
  initialState,
  extraReducers: builder => builder.addCase(fetchChat.pending, (state) => {
    state.status = 'pending'
  }).addCase(fetchChat.fulfilled, (state, action) => {
    state.status = 'idle'
    state.contacts = action.payload.contacts
  }).addCase(fetchChat.rejected, (state, action) => {
    state.status = 'idle'
    state.error = action.error
  }).addCase(sendPeerId.pending, (state) => {
    state.status = 'pending'
  }).addCase(sendPeerId.fulfilled, (state, action) => {
    state.status = 'idle'
    state.connection = action.payload
  }).addCase(sendPeerId.rejected, (state, action) => {
    state.status = 'idle'
    state.error = action.error
  })
})

export default loungeSlice.reducer
