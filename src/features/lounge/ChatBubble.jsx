import { Flex, Text } from '@chakra-ui/react'

const ChatBubble = ({ text, sender, color }) => {
  return (
    <Flex bg='teal.400' mx='2' bgColor={color} w='min-content' h='min-content' alignSelf={sender ? 'flex-end' : 'flex-start'} overflowWrap='break-word' borderRadius='lg' m='2'>
      <Text p='10px'>
        {text}
      </Text>
    </Flex>
  )
}

export default ChatBubble
