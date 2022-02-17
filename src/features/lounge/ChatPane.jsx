import {
  Flex,
  Input,
  IconButton,
  useColorModeValue,
  Box,
  Divider,
  Skeleton
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
  const chatId = useSelector((state) => state.lounge.activeChatMeta.id)
  const authToken = useSelector((state) => state.auth.session.token)
  const userId = useSelector((state) => state.auth.session.id)
  const msgCount = useSelector((state) => state.lounge.activeChatMeta.msgCount)
  const chats = useSelector((state) => {
    return state.lounge.contacts.length !== 0
      ? state.lounge.contacts.find((contact) => contact.id === chatId).chats
      : []
  })
  const name = useSelector((state) => state.lounge.contacts).find(
    (c) => c.id === chatId
  )?.name
  const image = useSelector((state) => state.lounge.contacts).find(
    (c) => c.id === chatId
  )?.image
  const bubbleColor = useColorModeValue('green.200', 'green.700')
  const bgColor = useColorModeValue('white', 'gray.700')
  const chatInputBgColor = useColorModeValue('gray.200', 'gray.800')

  // const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState('')
  const [chatBubbles, setChatBubbles] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const chatRef = useRef()
  const loader = useRef()

  const url = `${backendUrl}/api/chats/${chatId}`

  useEffect(() => {
    if (chatId && socket) {
      // get the chat for the contact and connect to the peer
      // dispatch(getChat({ url, authToken, id: chatId }))
      dispatch(setActiveChatMeta({ id: chatId, msgCount: 0 }))
      socket.emit('getChats', {
        chatId
      })
      // setConnection(peer.connect(peerId));
    }
    return () => dispatch(setActiveChatMeta({ id: '', msgCount: 0 }))
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
  }, [chats, userId, bubbleColor, msgCount])

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

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries, observer) => {
        setIsLoading(entries[0].isIntersecting)
      },
      {
        threshold: 1.0
      }
    )
    if (loader.current) observer.observe(loader.current)
    return () => observer.disconnect()
  }, [chats])
  useEffect(() => {
    if (isLoading && msgCount !== chats.length) {
      socket.emit('loadChatPart', {
        sender: userId,
        reciever: chatId,
        currentCount: chats.length
      })
    }
  }, [isLoading, socket, chatId, userId, msgCount, chats.length])

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
        status: 0,
        type: 'chatMessage'
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
      bgColor={bgColor}
      rounded={['lg', null, 'xl']}
      grow='1'
      overflow='hidden'
      boxShadow='2xl'
    >
      <ContactsNavbar name={name} image={image} />
      <Flex
        w='100%'
        pt='2'
        pb='1'
        flexDir='column-reverse'
        grow='1'
        overflowY='auto'
        overflowX='hidden'
      >

        {/* 👇 dummy div to scroll to bottom of the chat on sending message */}
        <div ref={chatRef} />
        {chatBubbles}
        <Skeleton
          key={-1}
          isLoaded={msgCount === chats.length && !isLoading}
          p='4' alignSelf='center' rounded='full' ref={loader}
        />
      </Flex>
      <Divider />
      <Box>
        <form onSubmit={handleSubmit}>
          <Flex py='2' px='1'>
            <Input
              border='none'
              bgColor={chatInputBgColor}
              placeholder='Type a message'
              rounded='full'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
