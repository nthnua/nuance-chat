import { Flex, Input, IconButton, useColorModeValue, Box } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatBubble from './ChatBubble'
import { addChat, getActiveChat } from './loungeSlice'
import { IoSend } from 'react-icons/io5'
import { useParams } from 'react-router'
import { backendUrl } from '../../env'
import { ContactsNavbar } from '../navbars/Contacts'
import { Divider } from '@chakra-ui/layout'

const ChatPane = ({ socket }) => {
  const dispatch = useDispatch()
  const { chatId } = useParams()
  const authToken = useSelector((state) => state.auth.session.token)
  const userId = useSelector((state) => state.auth.session.id)
  const chats = useSelector((state) => state.lounge.activeChat)

  const bubbleColor = useColorModeValue('green.200', 'green.700')

  // const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState('')
  const [chatBubbles, setChatBubbles] = useState([])

  const chatRef = useRef()

  const url = `${backendUrl}/api/chats/${chatId}`

  useEffect(() => {
    if (chatId && socket) {
      // get the chat for the contact and connect to the peer
      // dispatch(getChat({ url, authToken, id: chatId }))
      dispatch(getActiveChat({ chatId }))
      // setConnection(peer.connect(peerId));
    }
  }, [chatId, dispatch, url, authToken, socket])

  useEffect(() => {
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

  const handleSubmit = (e) => {
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
      socket.emit('chatMessage', data, (recievedData) => {
        console.log(recievedData)
      })
      setMessage('')
    }
  }

  return (
    <Flex
      flexDir='column'
      border='2px solid'
      borderColor={bubbleColor}
      rounded='xl'
      grow='1'
      overflow='hidden'
      boxShadow='2xl'
    >
      <ContactsNavbar />
      <Flex pt='2' pb='1' flexDir='column' grow='1' overflowY='auto' overflowX='hidden'>
        {chatBubbles}
        {/* 👇 dummy div to scroll to bottom of the chat on sending message */}
        <div ref={chatRef} />
      </Flex>
      <Box>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Flex p='2'>
            <Input
              colorScheme='green'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              mx='1'
              px='2'
            />
            <IconButton colorScheme='green' type='submit' mx='1' icon={<IoSend />} />
          </Flex>
        </form>
      </Box>
    </Flex>
  )
}

export default ChatPane
