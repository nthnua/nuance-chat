import {
  Flex,
  useColorModeValue,
  Avatar,
  useBreakpointValue
} from '@chakra-ui/react'
import { Heading } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/button'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router'
export const ContactsNavbar = ({ name }) => {
  const history = useHistory()
  const bgColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Flex
      p='2'
      px={[3, null, 4]}
      bg={bgColor}
      alignItems='center'
      justify='space-between'
      flexDir='row'
      shadow='0 2px 10px 0px rgba(0,0,0,0.05)'
    >
      <IconButton
        variant='ghost'
        display={['block', null, 'none']}
        onClick={() => history.push('/')}
        icon={<ArrowBackIcon />}
      />
      <Heading size='sm' alignSelf='center'>
        {name}
      </Heading>
      <Avatar size={useBreakpointValue({ base: 'sm', md: 'md' })} />
    </Flex>
  )
}
