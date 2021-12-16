import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { ProfileNav } from '../navbars/Profile'

function Profile () {
  const { userId } = useParams()

  const borderColor = useColorModeValue('#87E0E1', '#5A8D98')

  return (
    <Flex
      flexDir='column'
      border='2px solid'
      borderColor={borderColor}
      rounded={['md', null, 'xl']}
      alignItems='center'
      grow='1'
      p='0'
      overflow='hidden'
      boxShadow='2xl'
    >
      <ProfileNav userId={userId} />
      <Text color='gray.500' fontSize='lg' textAlign='center'>
        Numan Naeem
      </Text>
      <Box m='3'>
        <Button leftIcon={<AddIcon />}>Add friend</Button>
      </Box>
    </Flex>
  )
}

export default Profile
