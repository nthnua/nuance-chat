import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../api/client'

let auth = null
// get auth info from local storage
try {
  auth = JSON.parse(localStorage.getItem('auth'))
} catch (error) {
  console.log(error)
} finally {
  // if auth info not stored in local storage then initialize it
  if (!auth) {
    auth = {
      session: {
        id: '',
        token: '',
        peerId: '',
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
  }
}

const initialState = auth

export const requestLogin = createAsyncThunk(
  'auth/requestLogin',
  // return acton for fulfilled case
  ({ url, username, password }) => client.post(url, {
    username,
    password
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
    state.session.token = action.payload.token
    state.session.status = 'logged-in'
    state.session.id = action.payload.id
    state.login.status = 'idle'
    // when login store in localstorage
    localStorage.setItem('auth', JSON.stringify(state))
  }).addCase(requestLogin.rejected, (state, action) => {
    state.login.status = 'idle'
    state.session.error = action.error
  })
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
