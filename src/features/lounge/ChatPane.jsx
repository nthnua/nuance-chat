import { Box, Button, Flex, Input, IconButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatBubble from './ChatBubble'
import { addChat, getChat } from './loungeSlice'
import { IoSend } from 'react-icons/io5'

const ChatPane = ({ peer }) => {
    const dispatch = useDispatch()
    const authToken = useSelector(state => state.auth.session.token)
    const userId = useSelector(state => state.auth.session.id)
    const chatId = useSelector(state => state.lounge.activeChatMeta.id)
    const peerId = useSelector(state => state.lounge.activeChatMeta.peerId)
    const chats = useSelector(state => state.lounge.activeChat)
    const [connection, setConnection] = useState(null)
    const [message, setMessage] = useState('')
    const [chatBubbles, setChatBubbles] = useState([])

    const url = 'http://localhost:8000/api/chats/' + chatId
    useEffect(() => {
        if (chatId && peer) {
            //get the chat for the contact and connect to the peer
            dispatch(getChat({ url, authToken, id: chatId }))
            setConnection(peer.connect(peerId))
        }

    }, [chatId, dispatch, peerId, url, authToken, setConnection, peer])

    useEffect(() => {
        setChatBubbles(chats.map((chat, id) => <ChatBubble key={id} text={chat.content} sender={chat.sender === userId} />))
    }, [chats, userId])

    useEffect(() => {
        if (connection) {
            connection.on('open', () => {
                console.log('connection opened')
            })
        }
    }, [connection])

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        //send message
        const data = {
            sender: userId,
            reciever: '613093cfa0d8deb19738bbd0',
            content: message,
            time: Date.now()
        }
        dispatch(addChat(data))
        connection.send(data)
        setMessage('')

    }

    return (
        <Flex justify='end' flexDir='column' grow='1'>

            {chatBubbles}
            <form onSubmit={handleSubmit}>
                <Flex p='2'>
                    <Input value={message} onChange={(e) => setMessage(e.target.value)} mx='1' /><IconButton type='submit' mx='1' icon={<IoSend />} />
                </Flex>
            </form>
        </Flex>
    )
}

export default ChatPane
