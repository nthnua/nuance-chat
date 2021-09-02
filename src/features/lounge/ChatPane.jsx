import { Box, Button, Flex, Input } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatBubble from './ChatBubble'
import { getChatList } from './loungeSlice'

const ChatPane = ({ ...props }) => {
    const dispatch = useDispatch()
    const authToken = useSelector(state => state.auth.session.token)
    const userId = useSelector(state => state.auth.session.id)
    const chatId = useSelector(state => state.lounge.activeChat)
    const chats = useSelector(state => state.lounge.activeChats)
    console.log(chats)
    const url = 'http://localhost:8000/api/chats/' + chatId
    useEffect(() => {
        if (chatId)
            dispatch(getChatList({ url, authToken, id: chatId }))
    }, [chatId])
    const chatBubbles = chats.map((chat, id) => <ChatBubble key={id} text={chat.content} sender={chat.sender === userId} />)
    return <Flex justify='end' flexDir='column' grow='1'  {...props}>

        {chatBubbles}
        <Flex px='2'><Input></Input><Button></Button></Flex>

    </Flex >
}

export default ChatPane