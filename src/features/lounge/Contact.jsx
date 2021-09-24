import { Flex, Text, Avatar } from '@chakra-ui/react'
// import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
// import { setActiveChatMeta } from './loungeSlice'

const Contact = ({ id, name, peerId }) => {
  const history = useHistory()
  // const dispatch = useDispatch()
  const handleClick = () => {
    history.push(`/chat/${id}`)
    // dispatch(setActiveChatMeta({ id, peerId }))
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
