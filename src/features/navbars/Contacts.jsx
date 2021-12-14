import { Flex, useColorModeValue, Avatar } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/button'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router'
export const ContactsNavbar = ({ name }) => {
  const history = useHistory()
  const bgColor = useColorModeValue('#87E0E1', '#5A8D98')
  return (
    <Flex
      p='2'
      px={[2,null,4]}
      bg={bgColor}
      alignItems='center'
      justify='space-between'
      flexDir='row'
      shadow='0 2px 10px 1px rgba(0,0,0,0.15)'
    >
      <IconButton
        display={['block', null, 'none']}
        onClick={() => history.push('/')}
        icon={<ArrowBackIcon />}
      />
      <Heading size='sm' alignSelf='center'>
        {name}
      </Heading>
      <Avatar />
    </Flex>
  )
}
