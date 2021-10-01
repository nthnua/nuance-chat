import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, Flex, FormControl, FormLabel, Input, useColorModeValue, Text, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestLogin } from '../authSlice'
import { backendUrl } from '../../../env'

export const LoginPage = () => {
  // local state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const baseUrl = backendUrl || 'http://localhost:8000'
  const url = `${baseUrl}/api/login`
  // colors
  const loginPromptBg = useColorModeValue('#FFF', '#2F4858')
  const pageBg = useColorModeValue('#87E0E1', '#5A8D98')
  // redux dispatcher
  const dispatch = useDispatch()
  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(requestLogin({ url, username, password }))
  }
  return (
    <Flex w='100vw' h='100vh' bgSize='cover' bgColor={pageBg} align='center' justify='center'>
      <form onSubmit={handleSubmit}>
        <Flex p='8' m='0' w='sm' h='xl' bgColor={loginPromptBg} borderRadius='base' flexDir='column' justify='space-around'>
          <Heading>Hi there!</Heading>
          <Text fontSize={['md', null, 'lg']}>Good to see you again</Text>
          <FormControl isRequired>
            <FormLabel fontSize={['md', null, 'lg']}>
              Username
            </FormLabel>
            <Input fontSize={['md', null, 'lg']} type='username' value={username} onChange={e => setUsername(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={['md', null, 'lg']}>
              Password
            </FormLabel>
            <Input fontSize={['md', null, 'lg']} type='password' value={password} onChange={e => setPassword(e.target.value)} />
          </FormControl>

          <Button fontSize={['md', null, 'lg']} colorScheme='teal' alignSelf='flex-start' type='submit'>Login<ArrowForwardIcon mx='2' /></Button>

        </Flex>
      </form>
    </Flex>
  )
}
