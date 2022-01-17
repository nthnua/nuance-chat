import React, { useEffect, useRef, useState } from 'react'
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
  Text,
  useToast,
  Avatar,
  AvatarBadge,
  Icon
} from '@chakra-ui/react'
import { backendUrl } from '../../../service/config'
import { useSelector, useDispatch } from 'react-redux'
import { requestSignup } from '../authSlice'
import { IoMdAddCircleOutline } from 'react-icons/io'
import imageCompression from 'browser-image-compression'

function RegisterModal ({ isOpen, onClose }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [realName, setRealName] = useState('')
  const [image, setImage] = useState(null)

  const url = `${backendUrl}/api/signup`

  const signupStatus = useSelector(state => state.auth.signup.status)
  const signupMessage = useSelector(state => state.auth.signup.message)

  const dispatch = useDispatch()
  const toast = useToast()

  const registerUser = e => {
    e.preventDefault()
    // not so fancy redux stuff
    dispatch(requestSignup({ url, username, age, email, realName, password, image }))
  }

  useEffect(() => {
    toast.closeAll()
    if (signupStatus === 'pending') {
      toast({
        title: 'Hold on',
        description: 'Registering user',
        status: 'info',
        duration: 4000,
        isClosable: true
      })
    }
    if (signupStatus === 'rejected') {
      toast({
        title: 'Oops!',
        description: signupMessage,
        status: 'error',
        duration: 7000,
        isClosable: true
      })
    }

    return () => toast.closeAll()
  }, [signupStatus, signupMessage, toast])

  useEffect(() => {
  })
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
            {signupStatus === 'success'
              ? 'Successfully registered!'
              : 'Create your account'}
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
                  <FormControl>
                    <Avatar iconLabel='Add Image' size='xl' src={image}>
                      <FormLabel>
                        <AvatarBadge>
                          <Icon as={IoMdAddCircleOutline} />
                        </AvatarBadge>
                      </FormLabel>
                      <Input
                        display='contents'
                        type='file'
                        accept='image/*'
                        onChange={async (e) => {
                          const imageFile = e.target.files[0]
                          const options = {
                            maxSizeMB: 0.2,
                            maxWidthOrHeight: 1920,
                            useWebWorker: true
                          }
                          imageCompression(imageFile, options)
                            .then((compressedFile) => {
                              imageCompression.getDataUrlFromFile(compressedFile).then((imgUrl) => {
                                setImage(imgUrl)
                              }).catch(err => console.error(err))
                            })
                            .catch(err => console.log(err))
                        }}
                      />
                    </Avatar>
                  </FormControl>
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

          {signupStatus !== 'success' && (
            <ModalFooter>
              <Button
                disabled={signupStatus === 'pending'}
                type='submit'
                colorScheme='green'
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
