import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContactList from './ContactList'
import {
  updateContacts,
  updateChats,
  addChat,
  addFriendRequest,
  addContact,
  updateChatPart
} from './loungeSlice'
import ChatPane from './ChatPane'
import { Flex, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { Route, Redirect } from 'react-router-dom'
import Profile from './Profile'

export const Lounge = ({ socket }) => {
  // if device is a mobile or not
  const isMobile = useBreakpointValue({ base: true, md: false })

  // colors
  const bgColor = useColorModeValue('gray.100', 'gray.800')

  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.auth.session.token)
  const contacts = useSelector((state) => state.lounge.contacts)
  const chatId = useSelector((state) => state.lounge.activeChatMeta.id)
  const contactsStatus = useSelector((state) => state.lounge.contactsStatus)
  const friendRequests = useSelector((state) => state.lounge.friendRequests)
  // const url = `${backendUrl}/api/lounge`
  // const socket = io(backendUrl, {
  //   auth: {
  //     token: authToken
  //   }
  // })
  useEffect(() => {
    if (contactsStatus === 'loaded') {
      socket.emit('loadComplete')
    }
  }, [contactsStatus, socket])

  useEffect(() => {
    socket.once('initialContacts', (contacts, acknowledge) => {
      dispatch(updateContacts(contacts))
      acknowledge(Date.now())
    })
  }, [dispatch, socket])
  useEffect(() => {
    if (chatId) {
      socket.removeAllListeners('batchMessages')
      socket.once('batchMessages', (data) => {
        dispatch(updateChats({ chatId, data }))
      })
    }
  }, [chatId, dispatch, socket])
  useEffect(() => {
    socket.removeAllListeners('messageDelivery')
    socket.on('messageDelivery', ({ _id, status }, fn) => {
      status === 1 ? console.log('Sent') : console.log('Delivered')
      if (typeof fn === 'function') {
        fn({
          _id,
          status: 3
        })
      }
    })
  }, [socket])
  useEffect(() => {
    // once every chatMessage contacts state gets updated
    socket.removeAllListeners('chatMessage')
    socket.removeAllListeners('gotChatPart')
    socket.on('chatMessage', (data) => {
      // TODO: handle this somewhere else
      if (contacts.some((contact) => contact.id === data.sender)) {
        dispatch(
          addChat({
            chatId: data.sender,
            data
          })
        )
        socket.emit('deliveryReport', {
          _id: data._id,
          sender: data.sender,
          status: 2
        })
      } else if (data.type === 'friendRequest') {
        dispatch(addFriendRequest(data))
      }
      // else {
      //   dispatch(
      //     addContact({
      //       id: data.sender,
      //       name: 'Joe',
      //       chats: [data]
      //     })
      //   )
      // }
    })
    socket.on('gotChatPart', (data) => {
      // console.log(data)
      dispatch(updateChatPart(data))
    })
    socket.once('connect_error', (err) => {
      console.error(err)
    })
  }, [dispatch, authToken, contactsStatus, contacts, socket])

  useEffect(() => {
    socket.removeAllListeners('newContact')
    socket.on('newContact', (data) => {
      dispatch(addContact(data))
    })
  }, [dispatch, socket])

  return (
    <Flex bg={bgColor} w='100%' p={[1, null, 3]} height='92vh' direction='row'>
      <Route exact={isMobile} path='/'>
        <ContactList
          friendRequests={friendRequests}
          contacts={contacts}
          socket={socket}
        />
      </Route>
      <Route path='/chat/:chatId'>
        <Flex grow='1'>
          <ChatPane socket={socket} />
        </Flex>
      </Route>
      <Route path='/profile/:userId'>
        <Flex grow='1'>
          <Profile socket={socket} />
        </Flex>
      </Route>
      {/* 👇 if no URL match is found */}
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Flex>
  )
}
