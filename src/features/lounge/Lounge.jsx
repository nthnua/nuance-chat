import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContactList from './ContactList'
import { addChat, fetchContacts, socketConnected, addContact } from './loungeSlice'
import ChatPane from './ChatPane'
import { Flex } from '@chakra-ui/react'
import { io } from 'socket.io-client'
import { Route } from 'react-router'
import { backendUrl } from '../../env'

export const Lounge = () => {
  const dispatch = useDispatch()
  const authToken = useSelector(state => state.auth.session.token)
  const contacts = useSelector(state => state.lounge.contacts)
  const contactsStatus = useSelector(state => state.lounge.contactsStatus)
  // const chatId = useSelector(state => state.lounge.activeChatMeta.id)
  const baseUrl = backendUrl || 'http://localhost:8000'
  const url = `${baseUrl}/api/lounge`
  const socket = io(baseUrl, {
    auth: {
      token: authToken
    }
  })
  useEffect(() => {
    dispatch(fetchContacts({ url, authToken }))
  }, [authToken, dispatch, url])

  useEffect(() => {
    if (contactsStatus === 'loaded' && socket) {
      socket.emit('Connected')
    }
  }, [contactsStatus, socket])
  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        dispatch(socketConnected({
          url,
          authToken,
          socketId: socket.id
        }))
      })

      socket.on('messageDelivery', ({ mId, status }) => {
        status === 1 ? console.log('Sent') : console.log('Delivered')
      })
      socket.on('chatMessage', data => {
        //trusting the client to say the truth
        //if client lies then some other message's status can be manipulated with bruteforce
        //as mId is hard to guess
        socket.emit('deliveryReport', {
          mId: data.mID,
          sender: data.sender,
          status: 2
        })
        if (contacts.some(contact => contact.id === data.sender)) {
          console.log('yes')
          console.log(data)
          dispatch(addChat({
            chatId: data.sender,
            data
          }))
        } else {
          dispatch(addContact({
            id: data.sender,
            name: 'Joe',
            chats: [data]
          }))
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
