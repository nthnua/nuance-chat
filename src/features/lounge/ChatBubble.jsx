import { Flex, Text } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/color-mode'

const ChatBubble = ({ text, sender, color }) => {
  const bgColor = useColorModeValue('#87E0E1', '#5A8D98')
  return (
    <Flex
      px='3'
      py='2'
      mx='2'
      mb='1'
      bgGradient={`linear(to-br,${sender ? color : bgColor}, ${
        sender ? 'rgba(0,255,0,0.2)' : 'rgba(0,128,128, 0.2)'
      })`}
      bgColor={sender ? color : bgColor}
      maxW='80%'
      alignSelf={sender ? 'flex-end' : 'flex-start'}
      wordBreak='break-word'
      rounded='xl'
    >
      <Text>{text}</Text>
    </Flex>
  )
}

export default ChatBubble
