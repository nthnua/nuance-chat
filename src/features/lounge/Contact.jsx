import { Flex, Text, Icon, Avatar, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader } from '@chakra-ui/react'
import { IoMdContact } from 'react-icons/io'

const Contact = ({ name, connect, peerId }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex onClick={onOpen}
      cursor='pointer' align='center' fontSize='lg' borderRadius='md' p='2' h='14'>
      <Avatar>
        <Icon m='4' as={IoMdContact} w='12' h='12' />
      </Avatar>
      <Text px='2'>{name}</Text>

    </Flex>
  )
}

export default Contact
