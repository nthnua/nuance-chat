import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../api/client'

let auth = null
// get auth info from local storage
try {
  auth = JSON.parse(window.localStorage.getItem('auth'))
} catch (error) {
  console.log(error)
} finally {
  // if auth info not stored in local storage then initialize it
  if (!auth) {
    auth = {
      session: {
        id: '',
        token: '',
        status: 'logged-out',
        error: {}
      },
      login: {
        status: 'idle'
      },
      logout: {
        status: 'idle'
      },
      signup: {
        status: 'idle',
        error: false,
        message: ''
      }
    }
  }
}

const initialState = auth

export const requestLogin = createAsyncThunk(
  'auth/requestLogin',
  // return action for fulfilled case
  ({ url, username, password }) =>
    client.post(url, {
      username,
      password
    })
)
export const requestLogout = createAsyncThunk(
  'auth/requestLogout',
  ({ url, authToken }) =>
    client.post(url, {
    }, {
      headers: {
        Authorization: authToken
      }
    })

)
export const requestSignup = createAsyncThunk(
  'auth/requestSignup',
  ({ url, username, age, email, realName, password }) => client.post(url, {
    username, age, email, realName, password
  })
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login: state => { }
    // logout: (state, action) => {
    //   window.localStorage.removeItem('auth')
    //   state.session = {
    //     id: '',
    //     token: '',
    //     peerId: '',
    //     status: 'logged-out',
    //     error: {}
    //   }
    // }
  },
  extraReducers: builder =>
    builder
      .addCase(requestLogin.pending, state => {
        state.login.status = 'pending'
      })
      .addCase(requestLogin.fulfilled, (state, action) => {
        state.session.token = action.payload.token
        state.session.status = 'logged-in'
        state.session.id = action.payload.id
        state.login.status = 'idle'
        // when login store in localstorage
        window.localStorage.setItem('auth', JSON.stringify(state))
      })
      .addCase(requestLogin.rejected, (state, action) => {
        state.login.status = 'idle'
        state.session.error = action.error
      })
      .addCase(requestLogout.pending, (state, action) => {
        window.localStorage.removeItem('auth')
        window.location.assign('/login')
      })
      .addCase(requestLogout.fulfilled, (state, action) => {
      })
      .addCase(requestLogout.rejected, (state, action) => {
        state.session.error = action.error
        console.error(action.error)
      }).addCase(requestSignup.pending, (state, action) => {
        state.signup.status = 'pending'
      }).addCase(requestSignup.fulfilled, (state, action) => {
        state.signup.status = 'success'
        state.signup.message = action.payload
      }).addCase(requestSignup.rejected, (state, action) => {
        state.signup.status = 'rejected'
        state.signup.error = true
        console.log(action)
        state.signup.message = action.error.message
      })
})

export const { login } = authSlice.actions

export default authSlice.reducer
