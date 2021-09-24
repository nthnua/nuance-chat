import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContactList from './ContactList'
import { fetchContacts, socketConnected } from './loungeSlice'
import ChatPane from './ChatPane'
import { Flex } from '@chakra-ui/react'
import { io } from 'socket.io-client'
import { Route } from 'react-router'

export const Lounge = () => {
  const dispatch = useDispatch()
  const authToken = useSelector(state => state.auth.session.token)
  const contacts = useSelector(state => state.lounge.contacts)
  const url = 'http://localhost:8000/api/lounge'
  const socket = io('http://localhost:8000', {
    auth: {
      token: authToken
    }
  })
  useEffect(() => {
    dispatch(fetchContacts({ url, authToken }))
  }, [authToken, dispatch, url])

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        dispatch(socketConnected({
          url,
          authToken,
          socketId: socket.id
        }))
      })
      socket.on('chatMessage', data => {
        if (contacts.some(contact => contact.id === data.sender)) {
          console.log('yes')
        } else {
          console.log('no')
        }
      })
      socket.on('connect_error', (err) => {
        console.error(err)
      })
      socket.onAny((event, ...args) => {
        console.log(`got ${event}`)
      })
    }
  }, [socket, dispatch, url, authToken, contacts])

  return (
    <Flex w='100%' direction='row'>
      <ContactList contacts={contacts} />
      <Route path='/chat/:chatId'>
        <ChatPane socket={socket} />
      </Route>
    </Flex>
  )
}
