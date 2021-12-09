import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Flex, useColorMode, Text, useColorModeValue } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { useDispatch } from 'react-redux'
import { logout } from '../auth/authSlice'

export const NavBar = () => {
  const bgColor = useColorModeValue('green.100', 'green.400')
  const dispatch = useDispatch()
  const colorMode = window.localStorage.getItem('chakra-ui-color-mode')
  const { toggleColorMode } = useColorMode()
  const ColorModeToggleButton = props => {
    if (colorMode === 'dark') {
      return <SunIcon {...props} onClick={toggleColorMode} />
    } else {
      return <MoonIcon {...props} onClick={toggleColorMode} />
    }
  }
  return (
    <Flex
      py='3'
      px='5'
      bg={bgColor}
      justifyContent='space-between'
      alignItems='center'
      position='sticky'
      zIndex='sticky'
      top='0'
      height='8vh'
    >
      <Text fontSize='lg'>mint.chat</Text>
      <Flex alignItems='center'>
        <ColorModeToggleButton
          cursor='pointer'
          focusable
          transition='transform ease-out 200ms'
          _hover={{ transform: 'rotate(180deg) scale(1.2)' }}
        />
        <Button
          ml='5'
          onClick={() => {
            dispatch(logout())
          }}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  )
}
