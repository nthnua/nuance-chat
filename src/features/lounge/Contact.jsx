import { Flex, Text, Avatar } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { setActiveChatMeta } from './loungeSlice'
import { useColorModeValue } from '@chakra-ui/color-mode'

const Contact = ({ id, name, isActiveChat, fromSearch, realName, image }) => {
  const hoverColor = useColorModeValue('gray.100', '#3e4656') // custom color cause gray.700 or 500 doesn't work
  const activeColor = useColorModeValue('gray.200', 'gray.600')
  const history = useHistory()
  const dispatch = useDispatch()
  const handleClick = () => {
    if (fromSearch) {
      history.push(realName ? `/profile/${name}?realName=${realName}` : `/profile/${name}`)
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
      p={[2, null, 3]}
      cursor={!isActiveChat && 'pointer'}
      bg={isActiveChat && activeColor}
      key={`p_${id}`}
      m='1'
      mb='0'
      rounded='md'
      transition='ease-in 100ms'
      _hover={!isActiveChat && { bgColor: hoverColor }}
    >
      <Avatar name={name} src={image} />
      <Text px='2'>{name}</Text>
    </Flex>
  )
}

export default Contact
