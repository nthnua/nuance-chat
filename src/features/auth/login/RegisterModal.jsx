import React, { useRef, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  ModalHeader,
  Button,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Heading,
  Text
} from '@chakra-ui/react'
import { backendUrl } from '../../../service/config'

function RegisterModal ({ isOpen, onClose, finalRef }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [realName, setRealName] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const registerUser = async () => {
    // do your fancy redux shit
    const res = await window.fetch(`${backendUrl}/api/signup`, {
      method: 'POST',
      body: {
        username,
        age,
        email,
        realName,
        password
      }
    })
    if (res.ok) {
      setSuccess(true)
    } else {
      console.log(res)
      setError(res.statusText)
    }
  }

  const initialRef = useRef()
  return (
    <Modal
      isCentered
      closeOnOverlayClick={false}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {success
            ? (
              <>
                <Heading>Successfully registered!</Heading>
                <Text>
                  Check your inbox and verify your email to make the most of nuance!
                </Text>
              </>
              )
            : (
              <>
                {error && (
                  <Alert status='error' mb={4}>
                    <AlertIcon />
                    <AlertTitle mr={2}>Something went wrong!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                    <CloseButton
                      onClick={() => setError(false)}
                      position='absolute'
                      right='8px'
                      top='8px'
                    />
                  </Alert>
                )}
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    ref={initialRef}
                    placeholder='Username'
                  />
                </FormControl>
                <FormControl isRequired mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Password'
                  />
                </FormControl>

                <FormControl isRequired mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    ref={initialRef}
                    placeholder='Email'
                  />
                </FormControl>
                <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                  <GridItem>
                    <FormControl isRequired mt={4}>
                      <FormLabel>Real name</FormLabel>
                      <Input
                        value={realName}
                        onChange={e => setRealName(e.target.value)}
                        ref={initialRef}
                        placeholder='Real Name'
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl isRequired mt={4}>
                      <FormLabel>Age</FormLabel>
                      <Input
                        type='number'
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        ref={initialRef}
                        placeholder='Age'
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
              </>
              )}
        </ModalBody>

        <ModalFooter>
          <Button onClick={registerUser} colorScheme='teal' mr={3}>
            Register
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RegisterModal
