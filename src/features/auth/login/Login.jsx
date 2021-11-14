import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Text,
  Heading
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { useDispatch } from 'react-redux'
import { requestLogin } from '../authSlice'
import { backendUrl } from '../../../service/config'
import { Divider, Link } from '@chakra-ui/layout'
import RegisterModal from './RegisterModal'

export const LoginPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef()
  // local state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const url = `${backendUrl}/api/login`
  // colors
  const loginPromptBg = useColorModeValue('#FFF', '#2F4858')
  const pageBg = useColorModeValue('#87E0E1', '#5A8D98')
  // redux dispatcher
  const dispatch = useDispatch()
  // handle form submission
  const handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(requestLogin({ url, username, password }))
  }
  return (
    <>
      <RegisterModal isOpen={isOpen} onClose={onClose} finalRef={finalRef} />
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
                ref={finalRef}
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
            >
              Login
              <ArrowForwardIcon mx='2' />
            </Button>
            <Link mt='-3' fontSize='sm'>
              Forgot password
            </Link>
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
