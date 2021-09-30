import { Flex, Text, Avatar } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { setActiveChatMeta } from './loungeSlice'

const Contact = ({ id, name, peerId }) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(setActiveChatMeta({ id, peerId }))
  }
  return (
    <Flex
      onClick={handleClick}
      cursor='pointer' align='center' fontSize='lg' borderRadius='md' p='2' h='14'
    >
      <Avatar name={name} />
      <Text px='2'>{name}</Text>

    </Flex>
  )
}

export default Contact
