import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContactList from './ContactList'
import { updateContacts, updateChats, addChat } from './loungeSlice'
import ChatPane from './ChatPane'
import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { Route, Redirect } from 'react-router-dom'
import Profile from './Profile'

export const Lounge = ({ socket }) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const dispatch = useDispatch()
  const authToken = useSelector(state => state.auth.session.token)
  const contacts = useSelector(state => state.lounge.contacts)
  const chatId = useSelector(state => state.lounge.activeChatMeta.id)
  const contactsStatus = useSelector(state => state.lounge.contactsStatus)
  // const url = `${backendUrl}/api/lounge`
  // const socket = io(backendUrl, {
  //   auth: {
  //     token: authToken
  //   }
  // })
  useEffect(() => {}, [socket])

  useEffect(() => {
    socket.once('initialContacts', (contacts, acknowledge) => {
      dispatch(updateContacts(contacts))
      acknowledge(Date.now())
    })
  }, [dispatch, socket])
  useEffect(() => {
    if (chatId) {
      socket.removeAllListeners('batchMessages')
      socket.once('batchMessages', data => {
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
    socket.on('chatMessage', data => {
      socket.emit('deliveryReport', {
        _id: data._id,
        sender: data.sender,
        status: 2
      })
      // TODO: handle this somewhere else
      if (contacts.some(contact => contact.id === data.sender)) {
        console.log('yes')
        console.log(data)
        dispatch(
          addChat({
            chatId: data.sender,
            data
          })
        )
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

    socket.once('connect_error', err => {
      console.error(err)
    })
  }, [dispatch, authToken, contactsStatus, contacts, socket])

  return (
    <Flex w='100%' p={[1, null, 3]} height='92vh' direction='row'>
      <Route exact={isMobile} path='/'>
        <ContactList contacts={contacts} socket={socket} />
      </Route>
      <Route path='/chat/:chatId'>
        <Flex grow='1'>
          <ChatPane socket={socket} />
        </Flex>
      </Route>
      <Route path='/profile/:userId'>
        <Flex grow='1'>
          <Profile />
        </Flex>
      </Route>
      {/* <Redirect to='/' /> */}
    </Flex>
  )
}
