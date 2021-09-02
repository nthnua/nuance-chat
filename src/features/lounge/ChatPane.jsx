import { Box, Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import ChatBubble from './ChatBubble'

const ChatPane = () => {
    return <Flex grow='1' >
        <ChatBubble />
    </Flex>
}

export default ChatPane