import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Text,
  Heading,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { requestLogin } from '../authSlice'
import { backendUrl } from '../../../service/config'
import { Divider } from '@chakra-ui/layout'
import RegisterModal from './RegisterModal'

export const LoginPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  // local state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const url = `${backendUrl}/api/login`
  // colors
  const loginPromptBg = useColorModeValue('#FFF', '#2F4858')
  const pageBg = useColorModeValue('#87E0E1', '#5A8D98')
  const loginStatus = useSelector(state => state.auth.login.status)
  // redux dispatcher
  const dispatch = useDispatch()
  // handle form submission
  const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(requestLogin({ url, username, password }))
  }

  useEffect(() => {
    toast.closeAll()
    if (loginStatus === 'pending') {
      toast({
        title: 'Hold tight!',
        description: 'Logging you in',
        status: 'info',
        duration: 3000,
        isClosable: true
      })
    }
    if (loginStatus === 'failed') {
      toast({
        title: 'Oops!',
        description: 'Incorrect username or password',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }

    return () => toast.closeAll()
  }, [loginStatus, toast])
  return (
    <>
      <RegisterModal onClose={onClose} isOpen={isOpen} />
      <Flex
        w='100vw'
        h='100vh'
        bgSize='cover'
        bgColor={pageBg}
        align='center'
        justify='center'
      >
        <form onSubmit={handleSubmit}>
          <Flex
            p='8'
            m='0'
            w='sm'
            h='xl'
            bgColor={loginPromptBg}
            borderRadius='base'
            flexDir='column'
            justify='space-around'
          >
            <Heading mb='-2'>Hi there!</Heading>
            <Text fontWeight='light' fontSize={['md', null, 'lg']}>
              Good to see you again
            </Text>
            <FormControl isRequired>
              <FormLabel fontSize={['md', null, 'lg']}>Username</FormLabel>
              <Input
                fontSize={['md', null, 'lg']}
                type='username'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize={['md', null, 'lg']}>Password</FormLabel>
              <Input
                fontSize={['md', null, 'lg']}
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              fontSize={['md', null, 'lg']}
              colorScheme='teal'
              alignSelf='flex-start'
              type='submit'
              disabled={loginStatus === 'pending'}
            >
              Login
              <ArrowForwardIcon mx='2' />
            </Button>
            {/* temporarily commented out for web-dev demo
            <Link mt='-3' fontSize='sm'>
              Forgot password
            </Link> */}
            <Divider />
            <Flex flexDir='column'>
              <Text fontWeight='light' mb='3'>
                New here?
              </Text>
              <Button
                // fontSize={['md', null, 'lg']}
                alignSelf='flex-start'
                size='md'
                title='Create account'
                onClick={onOpen}
              >
                Create account
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </>
  )
}
