import { Box, Divider, Flex, IconButton } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import Contact from './Contact'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { ChatNavbar } from '../navbars/Chats'
import { AddIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'
import ContactDiscovery from './ContactDiscovery'
import { useState } from 'react'

const ContactList = ({ contacts }) => {
  const [contactDisc, setContactDisc] = useState(false)
  const borderColor = useColorModeValue('green.300', 'green.700')
  const selfId = useSelector(state => state.auth.session.id)
  const activeChatId = useSelector(state => state.lounge.activeChatMeta.id)
  const history = useHistory()

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
  return contactDisc ? (
    <ContactDiscovery setContactDisc={setContactDisc} />
  ) : (
    <Flex minW='35vw' grow={['1', null, '0']}>
      <Flex
        grow='1'
        overflow='hidden'
        rounded={['sm', null, 'xl']}
        mr={[0, null, 3]}
        boxShadow='xl'
        position='relative'
      >
        <Box
          position='absolute'
          bottom='12px'
          right='12px'
          zIndex={1}
          borderRadius='50%'
          overflow='hidden'
        >
          <IconButton
            aria-label='Find contacts'
            size='lg'
            colorScheme='green'
            icon={<AddIcon />}
            isRound
            variant='solid'
            onClick={() => setContactDisc(true)}
          />
        </Box>
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
    </Flex>
  )
}

export default ContactList
