import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../api/client';
const initialState = {
    data: '',
    status: 'idle'
}

export const fetchChat = createAsyncThunk(
    'lounge/fetchChat',
    ({ url, auth_token }) => client.get(url, {
        headers: {
            'Authorization': auth_token
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
        state.data = action.payload
    })
})

export default loungeSlice.reducer