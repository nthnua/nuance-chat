import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContactList from './ContactList'
import { updateContacts, addContact, addChat } from './loungeSlice'
import ChatPane from './ChatPane'
import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { socket } from '../../service/socket'
import { Route } from 'react-router'
// import { backendUrl } from '../../service/config'

export const Lounge = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.auth.session.token)
  const contacts = useSelector((state) => state.lounge.contacts)
  // const chatId = useSelector(state => state.lounge.activeChatMeta.id)

  // const url = `${backendUrl}/api/lounge`
  // const socket = io(backendUrl, {
  //   auth: {
  //     token: authToken
  //   }
  // })

  useEffect(() => {
    if (socket) {
      console.log('something changed')
      socket.on('initialContacts', (contacts, acknowledge) => {
        dispatch(updateContacts(contacts))
        acknowledge(Date.now())
      })
    }
  }, [dispatch])

  useEffect(() => {
    if (socket) {
      socket.on('messageDelivery', ({ _id, status }, fn) => {
        status === 1 ? console.log('Sent') : console.log('Delivered')
        if (typeof fn === 'function') {
          fn({
            _id,
            status: 3
          })
        }
      })
      socket.on('chatMessage', (data) => {
        // trusting the client to say the truth
        // if client lies then some other message's status can be manipulated with bruteforce
        // as _id is hard to guess
        console.log(data._id)
        socket.emit('deliveryReport', {
          _id: data._id,
          sender: data.sender,
          status: 2
        })
        // TODO: handle this somewhere else
        if (contacts.some((contact) => contact.id === data.sender)) {
          console.log('yes')
          console.log(data)
          dispatch(
            addChat({
              chatId: data.sender,
              data
            })
          )
        } else {
          dispatch(
            addContact({
              id: data.sender,
              name: 'Joe',
              chats: [data]
            })
          )
        }
      })

      socket.on('connect_error', (err) => {
        console.error(err)
      })
      socket.onAny((event, ...args) => {
        console.log(`got ${event}`)
      })
    }
  }, [dispatch, authToken, contacts])

  return (
    <Flex w='100%' p={[1, null, 3]} height='92vh' direction='row'>
      <Route exact={isMobile} path='/'>
        <Flex minW='35vw' grow={['1', null, '0']}>
          <ContactList contacts={contacts} />
        </Flex>
      </Route>
      <Route path='/chat/:chatId'>
        <Flex grow='1'>
          <ChatPane socket={socket} />
        </Flex>
      </Route>
    </Flex>
  )
}
