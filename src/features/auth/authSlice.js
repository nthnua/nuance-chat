import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../api/client';

const initialState = {
    auth: {
        token: '',
        status: 'logged-out',
        error: {}
    },
    login: {
        status: 'idle'
    },
    logout: {
        status: 'idle'
    }
}

export const requestLogin = createAsyncThunk(
    'auth/requestLogin',
    //return acton for fulfilled case
    ({ url, username, passphrase }) => client.post(url, {
        username,
        passphrase
    })
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {

        },
        logout: (state) => {
            state = initialState
        }
    },
    extraReducers: (builder) => builder.addCase(requestLogin.pending, (state) => {
        state.login.status = 'pending'
    }).addCase(requestLogin.fulfilled, (state, action) => {
        state.auth.token = action.payload.token
        state.auth.status = 'logged-in'
        state.login.status = 'idle'
    }).addCase(requestLogin.rejected, (state, action) => {
        state.login.status = 'idle'
        state.auth.error = action.error
    })
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer