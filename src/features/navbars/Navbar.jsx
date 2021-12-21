import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Flex, useColorMode, Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { requestLogout } from '../auth/authSlice'
import { backendUrl } from '../../service/config'

export const NavBar = ({ socket }) => {
  const dispatch = useDispatch()
  const colorMode = window.localStorage.getItem('chakra-ui-color-mode')
  const authToken = useSelector(state => state.auth.session.token)
  const { toggleColorMode } = useColorMode()
  const url = `${backendUrl}/api/logout`
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
      bg='green.600'
      color='white'
      justifyContent='space-between'
      alignItems='center'
      position='sticky'
      zIndex='sticky'
      top='0'
      height='8vh'
    >
      <Text fontSize='lg'>nuance.chat</Text>
      <Flex alignItems='center'>
        <ColorModeToggleButton
          cursor='pointer'
          focusable
          transition='transform ease-out 200ms'
          _hover={{ transform: 'rotate(180deg) scale(1.2)' }}
        />
        <Button
          colorScheme='green'
          ml='5'
          size='sm'
          onClick={() => {
            dispatch(requestLogout({ url, authToken }))
          }}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  )
}
