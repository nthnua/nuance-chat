import {
  Flex,
  Input,
  IconButton,
  useColorModeValue,
  Box
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatBubble from './ChatBubble'
import { addChat, setActiveChatMeta } from './loungeSlice'
import { IoSend } from 'react-icons/io5'
import { backendUrl } from '../../service/config'
import { ContactsNavbar } from '../navbars/Contacts'

const ChatPane = ({ socket }) => {
  const dispatch = useDispatch()
  const chatId = useSelector(state => state.lounge.activeChatMeta.id)
  const authToken = useSelector(state => state.auth.session.token)
  const userId = useSelector(state => state.auth.session.id)
  const chats = useSelector(state => {
    return state.lounge.contacts.length !== 0
      ? state.lounge.contacts.find(contact => contact.id === chatId).chats
      : []
  })
  const name = useSelector(state => state.lounge.contacts).find(
    c => c.id === chatId
  )?.name
  const bubbleColor = useColorModeValue('green.200', 'green.700')
  const bgColor = useColorModeValue('white', 'gray.700')
  const chatInputBgColor = useColorModeValue('gray.100', 'gray.800')

  // const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState('')
  const [chatBubbles, setChatBubbles] = useState([])

  const chatRef = useRef()

  const url = `${backendUrl}/api/chats/${chatId}`

  useEffect(() => {
    if (chatId && socket) {
      // get the chat for the contact and connect to the peer
      // dispatch(getChat({ url, authToken, id: chatId }))
      dispatch(setActiveChatMeta({ id: chatId }))
      socket.emit('getChats', {
        chatId
      })
      // setConnection(peer.connect(peerId));
    }
    return () => dispatch(setActiveChatMeta({ id: '' }))
  }, [chatId, dispatch, url, authToken, socket])

  // useEffect(() => {
  //   dispatch(getActiveChat({ chatId }))
  // }, [contacts, dispatch, chatId])
  useEffect(() => {
    if (chats.length !== 0) {
      setChatBubbles(
        chats.map((chat, id) => (
          <ChatBubble
            key={id}
            text={chat.content}
            sender={chat.sender === userId}
            color={bubbleColor}
          />
        ))
      )
    }

    setTimeout(() => chatRef.current?.scrollIntoView({ behavior: 'smooth' }), 1) // scroll after 1 tick, won't work otherwise
  }, [chats, userId, bubbleColor])

  // useEffect(() => {
  //   if (connection) {
  //     connection.on("open", () => {
  //       console.log("connection opened");
  //     });
  //     connection.on("close", () => {
  //       console.log("co closed");
  //     });
  //     connection.on("error", (err) => {
  //       console.error(err);
  //     });
  //   }
  // }, [connection]);
  // useEffect(() => {
  //   dispatch(setActiveChatMeta({ chatId }))
  // }, [chatId, dispatch])

  const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    // send message
    if (message) {
      const data = {
        sender: userId,
        reciever: chatId,
        content: message,
        time: Date.now(),
        status: 0
      }
      dispatch(addChat({ chatId, data }))
      socket.emit('chatMessage', data, recievedData => {
        console.log(recievedData)
      })
      setMessage('')
    }
  }

  return (
    <Flex
      flexDir='column'
      bgColor={bgColor}
      rounded={['lg', null, 'xl']}
      grow='1'
      overflow='hidden'
      boxShadow='2xl'
    >
      <ContactsNavbar name={name} />
      <Flex
        w='100%'
        pt='2'
        pb='1'
        flexDir='column'
        grow='1'
        overflowY='auto'
        overflowX='hidden'
      >
        {chatBubbles}
        {/* 👇 dummy div to scroll to bottom of the chat on sending message */}
        <div ref={chatRef} />
      </Flex>
      {/* <Divider /> */}
      <Box>
        <form onSubmit={handleSubmit}>
          <Flex py='2' px='1'>
            <Input
              border='none'
              bgColor={chatInputBgColor}
              placeholder='Type a message'
              borderColor={useColorModeValue('gray.400', 'gray.500')}
              rounded='full'
              value={message}
              onChange={e => setMessage(e.target.value)}
              mx='1'
              // px='3'
              autoFocus
            />
            <IconButton
              rounded='full'
              colorScheme='green'
              type='submit'
              mx='1'
              icon={<IoSend />}
            />
          </Flex>
        </form>
      </Box>
    </Flex>
  )
}

export default ChatPane
