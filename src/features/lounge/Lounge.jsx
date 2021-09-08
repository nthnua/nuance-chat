import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContactList from './ContactList'
import { fetchContacts } from './loungeSlice'
import ChatPane from './ChatPane'
import { Flex } from '@chakra-ui/react'
import { io } from 'socket.io-client'

export const Lounge = () => {
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.auth.session.token)
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
        console.log('Socket connected!', socket.id)
      })
      socket.onAny((event, ...args) => {
        console.log(`got ${event}`)
      })
      socket.on('connect_error', (err) => {
        console.error(err)
      })
    }
  })

  return (
    <Flex w='100%' overflow='hidden' direction='row'>
      <ContactList />
      <ChatPane socket={socket} />
    </Flex>
  )
}
