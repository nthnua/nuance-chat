import { Flex, Text, Avatar, IconButton, Box } from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { useDispatch } from 'react-redux'
import { removeFriendRequest } from './loungeSlice'

const FriendRequest = ({ id, sender, reciever, socket }) => {
  const dispatch = useDispatch()
  const activeColor = useColorModeValue('white', 'gray.700')
  const handleAccept = () => {
    const data = {
      sender: reciever,
      reciever: sender,
      type: 'friendRequest',
      content: {
        requestId: id,
        actionType: 'accept'
      }
    }
    socket.emit('acceptOrRejectFriendRequest', data)
    dispatch(removeFriendRequest({ _id: id }))
  }
  const handleReject = () => {
    const data = {
      sender: reciever,
      reciever: sender,
      type: 'friendRequest',
      content: {
        requestId: id,
        actionType: 'reject'
      }
    }
    socket.emit('acceptOrRejectFriendRequest', data)
    dispatch(removeFriendRequest({ _id: id }))
  }
  return (
    <Flex
      align='center'
      justify='space-between'
      fontSize='lg'
      p={[2, null, 3]}
      bg={activeColor}
      key={`p_${id}`}
      m='1'
      mb='0'
      rounded='md'
      transition='ease-in 100ms'
    >
      <Flex alignItems='center'>
        <Avatar name={sender} />
        <Box mx='2'>
          <Text fontSize='lg'>{sender}</Text>
          <Text color='gray.400' variant='subtitle' fontSize='sm'>
            New Friend Request!
          </Text>
        </Box>
      </Flex>
      <Flex alignItems='center'>
        <IconButton
          rounded='full'
          colorScheme='green'
          variant='outline'
          icon={<CheckIcon />}
          onClick={handleAccept}
          mr='2'
        />
        <IconButton
          rounded='full'
          colorScheme='red'
          variant='outline'
          icon={<CloseIcon />}
          onClick={handleReject}
        />
      </Flex>
    </Flex>
  )
}

export default FriendRequest
