import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { ProfileNav } from '../navbars/Profile'

function Profile () {
  const { userId } = useParams()
  const useQuery = () => {
    const { search } = useLocation()
    return React.useMemo(() => new URLSearchParams(search), [search])
  }
  const query = useQuery()
  const bgColor = useColorModeValue('white', 'gray.700')

  const handleClick = () => {
    // dispatch some redux thingamajig to send friend request
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
