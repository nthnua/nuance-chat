import { Flex } from '@chakra-ui/layout'
import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { io } from 'socket.io-client'
import { LoginPage } from './features/auth/login/Login'
import { Lounge } from './features/lounge/Lounge'
import { NavBar } from './features/navbars/Navbar'
import { backendUrl } from './service/config'

function App () {
  const loginStatus = useSelector(state => state.auth.session.status)
  const authToken = useSelector(state => state.auth.session.token)
  if (loginStatus === 'logged-out') {
    return <LoginPage />
  } else if (loginStatus === 'logged-in') {
    const socket = io(backendUrl, {
      auth: {
        token: authToken
      }
    })
    return (
      <BrowserRouter>
        <Flex flexDir='column' h='100vh'>
          <NavBar />
          <Flex alignSelf='stretch' flexGrow='2'>
            <Lounge socket={socket} />
          </Flex>
        </Flex>
      </BrowserRouter>
    )
  }
}

export default App
