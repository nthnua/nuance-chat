import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, Flex, FormControl, FormLabel, Input, useColorModeValue, Text, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestLogin } from '../authSlice'

export const LoginPage = () => {
  //local state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const url = 'http://localhost:8000/api/login'
  //colors
  const loginPromptBg = useColorModeValue('#FFF', '#2F4858')
  const pageBg = useColorModeValue('#87E0E1', '#5A8D98')
  //redux dispatcher
  const dispatch = useDispatch()
  //handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(requestLogin({ url, username, password }))
  }
  return (
    <Flex w='100vw' h='100vh' bgSize='cover' bgColor={pageBg} align='center' justify='center'>
      <form onSubmit={handleSubmit}>
        <Flex p='8' m='0' w={'sm'} h='xl' bgColor={loginPromptBg} borderRadius='base' flexDir='column' justify='space-around'>
          <Heading>Hi there!</Heading>
          <Text>Good to see you again</Text>
          <FormControl isRequired>
            <FormLabel>
              Username
            </FormLabel>
            <Input type='username' value={username} onChange={e => setUsername(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>
              Password
            </FormLabel>
            <Input type='password' value={password} onChange={e => setPassword(e.target.value)} />
          </FormControl>

          <Button colorScheme='teal' alignSelf='flex-start' type='submit' >Login<ArrowForwardIcon mx='2'></ArrowForwardIcon></Button>

        </Flex>
      </form>
    </Flex >
  )
}
