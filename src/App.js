import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { LoginPage } from './features/auth/login/Login'
import { Lounge } from './features/lounge/Lounge'

function App () {
  const loginStatus = useSelector(state => state.auth.session.status)
  if (loginStatus === 'logged-out') {
    return (<LoginPage />)
  } else if (loginStatus === 'logged-in') {
    return (
      <BrowserRouter>
        <Lounge />
      </BrowserRouter>
    )
  }
}

export default App