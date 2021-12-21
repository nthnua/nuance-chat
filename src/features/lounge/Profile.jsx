import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { ProfileNav } from '../navbars/Profile'

function Profile ({ socket }) {
  const { userId } = useParams()
  const selfId = useSelector(state => state.auth.session.id)

  const useQuery = () => {
    const { search } = useLocation()
    return React.useMemo(() => new URLSearchParams(search), [search])
  }
  const query = useQuery()
  const bgColor = useColorModeValue('white', 'gray.700')

  const handleClick = () => {
    const data = {
      reciever: userId,
      sender: selfId,
      type: 'friendRequest'
    }
    socket.emit('friendRequest', data, recievedData =>
      console.log(recievedData)
    )
  }

  return (
    <Flex
      flexDir='column'
      bgColor={bgColor}
      rounded={['md', null, 'xl']}
      alignItems='center'
      grow='1'
      p='0'
      overflow='hidden'
      boxShadow='2xl'
    >
      <ProfileNav userId={userId} />
      <Text color='gray.500' fontSize='lg' textAlign='center'>
        {query.get('realName')}
      </Text>
      <Box m='3'>
        <Button leftIcon={<AddIcon />} onClick={handleClick}>
          Add friend
        </Button>
      </Box>
    </Flex>
  )
}

export default Profile
