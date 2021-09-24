import { Flex, Input, IconButton, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatBubble from './ChatBubble'
import { addChat, getChat } from './loungeSlice'
import { IoSend } from 'react-icons/io5'
import { useParams } from 'react-router'

const ChatPane = ({ socket }) => {
  const dispatch = useDispatch()
  const { chatId } = useParams()
  const authToken = useSelector((state) => state.auth.session.token)
  const userId = useSelector((state) => state.auth.session.id)
  const chats = useSelector((state) => state.lounge.activeChat)

  const bubbleColor = useColorModeValue('#87E0E1', '#5A8D98')

  // const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState('')
  const [chatBubbles, setChatBubbles] = useState([])

  const url = 'http://localhost:8000/api/chats/' + chatId
  useEffect(() => {
    if (chatId && socket) {
      // get the chat for the contact and connect to the peer
      dispatch(getChat({ url, authToken, id: chatId }))
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

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // send message
    const data = {
      sender: userId,
      reciever: chatId,
      content: message,
      time: Date.now()
    }
    dispatch(addChat(data))
    socket.emit('chatMessage', data)
    setMessage('')
  }

  return (
    <Flex justify='end' flexDir='column' h='100vh' grow='1'>
      {chatBubbles}
      <form onSubmit={handleSubmit}>
        <Flex p='2'>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            mx='1'
          />
          <IconButton colorScheme='teal' type='submit' mx='1' icon={<IoSend />} />
        </Flex>
      </form>
    </Flex>
  )
}

export default ChatPane
