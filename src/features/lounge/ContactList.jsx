import { Divider, Flex } from '@chakra-ui/react'
import { ContactsNavbar } from '../navbars/Contacts'
import Contact from './Contact'

const ContactList = ({ contacts }) => {
  const CL = contacts.map((contact, id) => (
    <div key={`p_${id}`}>
      <Divider key={`d_${id}`} orientation='horizontal' />
      <Contact key={id} id={contact.id} name={contact.name} peerId={contact.peerId} />
    </div>)
  )
  return (
    <Flex flexDir='column'><ContactsNavbar />
      <Flex overflowY='scroll' flexDir='column' h='100vh' w='xs'>
        {CL}
      </Flex>
    </Flex>
  )
}

export default ContactList
