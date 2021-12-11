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
  AlertDescription,
  Text
} from '@chakra-ui/react'
import { backendUrl } from '../../../service/config'
import { useSelector, useDispatch } from 'react-redux'
import { requestSignup } from '../authSlice'

function RegisterModal ({ isOpen, onClose }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [realName, setRealName] = useState('')
  const url = `${backendUrl}/api/signup`
  const signupStatus = useSelector(state => state.auth.signup.status)
  const signupMessage = useSelector(state => state.auth.signup.message)
  const signupErrorStatus = useSelector(state => state.auth.signup.error)
  const dispatch = useDispatch()
  const registerUser = e => {
    e.preventDefault()
    // not so fancy redux stuff
    dispatch(requestSignup({ url, username, age, email, realName, password }))
  }

  const initialRef = useRef()
  return (
    <Modal
      isCentered
      closeOnOverlayClick={false}
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={registerUser}>
          <ModalHeader>
            {signupStatus === 'success' ? 'Successfully registered!' : 'Create your account'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {signupStatus === 'success'
              ? (
                <>
                  <Text fontSize='xl'>
                    Check your inbox and verify your email to make the most of
                    nuance!
                  </Text>
                </>
                )
              : (
                <>
                  {signupErrorStatus && (
                    <Alert status='error' mb={4}>
                      <AlertIcon />

                      <AlertDescription>{signupMessage}</AlertDescription>
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
                          placeholder='Age'
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </>
                )}
          </ModalBody>

          {!(signupStatus === 'success') && (
            <ModalFooter>
              <Button
                isLoading={signupStatus === 'pending'}
                loadingText='Registering...'
                type='submit'
                colorScheme='teal'
                mr={3}
              >
                Register
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          )}
        </form>
      </ModalContent>
    </Modal>
  )
}

export default RegisterModal
