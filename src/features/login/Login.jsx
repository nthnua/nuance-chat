import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, Flex, FormControl, FormLabel, Input, useColorModeValue, Text, Heading } from '@chakra-ui/react'
import { useState } from 'react'

export const LoginPage = () => {
  //local state
  const [username, setUsername] = useState('')
  const [passphrase, setPassphrase] = useState('')
  //colors
  const loginPromptBg = useColorModeValue('#FFF', '#2F4858')
  const pageBg = useColorModeValue('#87E0E1', '#5A8D98')

  return (
    <Flex w='100vw' h='100vh' bgSize='cover' bgColor={pageBg} align='center' justify='center'>
      <form>
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
              Passphrase
            </FormLabel>
            <Input type='password' value={passphrase} onChange={e => setPassphrase(e.target.value)} />
          </FormControl>

          <Button colorScheme='teal' alignSelf='start' type='submit' >Login<ArrowForwardIcon mx='2'></ArrowForwardIcon></Button>

        </Flex>
      </form>
    </Flex >
  )
}
