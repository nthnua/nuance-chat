import { Divider, Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import Contact from './Contact'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { ChatNavbar } from '../navbars/Chats'

const ContactList = ({ contacts }) => {
  const borderColor = useColorModeValue('green.300', 'green.700')
  const selfId = useSelector(state => state.auth.session.id)
  const activeChatId = useSelector(state => state.lounge.activeChatMeta.id)

  const CL = contacts.map((contact, id) => {
    const isActiveChat = contact.id === activeChatId
    return (
      contact.id !== selfId && (
        <Contact
          isActiveChat={isActiveChat}
          key={id}
          id={contact.id}
          name={contact.name}
          peerId={contact.peerId}
        />
      )
    )
  })
  return (
    <Flex
      grow='1'
      overflow='hidden'
      rounded='xl'
      mr={[0, null, 3]}
      boxShadow='xl'
    >
      <Flex
        grow='1'
        rounded='xl'
        backgroundColor={borderColor}
        flexDir='column'
      >
        <ChatNavbar />
        <Divider />
        <Flex flexDir='column' overflow='auto'>
          {CL}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ContactList
