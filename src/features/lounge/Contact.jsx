import { Flex, Text, Avatar } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { setActiveChatMeta } from './loungeSlice'
import { useColorModeValue } from '@chakra-ui/color-mode'

const Contact = ({ id, name, isActiveChat, fromSearch }) => {
  const hoverColor = useColorModeValue('green.200', 'green.600')
  const activeColor = useColorModeValue('green.100', 'green.500')
  const history = useHistory()
  const dispatch = useDispatch()
  const handleClick = () => {
    if (fromSearch) {
      history.push(`/profile/${id}`)
      return
    }
    history.push(`/chat/${id}`)
    dispatch(setActiveChatMeta({ id }))
  }
  return (
    <Flex
      onClick={!isActiveChat ? handleClick : null}
      align='center'
      fontSize='lg'
      borderRadius='md'
      p='2'
      cursor={!isActiveChat && 'pointer'}
      bg={isActiveChat && activeColor}
      key={`p_${id}`}
      m='2'
      rounded='lg'
      transition='ease-in 100ms'
      _hover={!isActiveChat && { bgColor: hoverColor }}
    >
      <Avatar name={name} />
      <Text px='2'>{name}</Text>
    </Flex>
  )
}

export default Contact
