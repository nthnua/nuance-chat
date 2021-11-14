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
  Button
} from '@chakra-ui/react'

function RegisterModal ({ isOpen, onClose, finalRef }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const registerUser = () => {
    // do your fancy redux shit
    onClose()
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
