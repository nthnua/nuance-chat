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
  CloseButton,
  Text
} from '@chakra-ui/react'
import { backendUrl } from '../../../service/config'

function RegisterModal ({ isOpen, onClose }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [btnLoading, setBtnLoading] = useState(false)
  const [realName, setRealName] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState({ flag: false })

  const registerUser = async e => {
    e.preventDefault()
    setBtnLoading(true)
    const body = { username, age, email, realName, password }
    console.log(body)
    // do your fancy redux shit
    const res = await window.fetch(`${backendUrl}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    if (res.ok) {
      setSuccess(true)
    } else {
      const jsonRes = await res.json()
      setError({
        flag: true,
        message: jsonRes.message || 'Soemthing went wrong'
      })
    }
    setBtnLoading(false)
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
            {!success ? 'Create your account' : 'Successfully registered!'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {success
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
                  {error.flag && (
                    <Alert status='error' mb={4}>
                      <AlertIcon />
                      <CloseButton
                        onClick={() => setError({ flag: false })}
                        position='absolute'
                        right='8px'
                        top='8px'
                      />
                      <AlertDescription>{error.message}</AlertDescription>
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

          {!success && (
            <ModalFooter>
              <Button
                isLoading={btnLoading}
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
