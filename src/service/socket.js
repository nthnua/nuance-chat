import io from 'socket.io-client'
import { backendUrl } from './config'
let authToken = null
try {
  authToken = JSON.parse(window.localStorage.getItem('auth')).session.token
} catch (error) {
  authToken = null
  console.log(error)
}
window.addEventListener('initialAuthToken', (e) => {
  authToken = e.detail
})
export const socket = authToken
  ? io(backendUrl, {
      auth: {
        token: authToken
      }
    })
  : null
