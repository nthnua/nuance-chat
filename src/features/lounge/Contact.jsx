import { Flex, Text, Icon, Avatar } from '@chakra-ui/react'
import { IoMdContact } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { setActiveChat } from './loungeSlice'

const Contact = ({ id, name, connect, peerId }) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(setActiveChat(id))
  }
  return (
    <Flex onClick={handleClick}
      cursor='pointer' align='center' fontSize='lg' borderRadius='md' p='2' h='14'>
      <Avatar>
        <Icon m='4' as={IoMdContact} w='12' h='12' />
      </Avatar>
      <Text px='2'>{name}</Text>

    </Flex>
  )
}

export default Contact
