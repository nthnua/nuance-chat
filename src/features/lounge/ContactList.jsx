import { Divider, Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import Contact from './Contact'

const ContactList = () => {
  const contacts = useSelector(state => state.lounge.contacts)
  const CL = contacts.map((contact, id) => (
    <div key={`p_${id}`}>
      <Divider key={`d_${id}`} orientation='horizontal' />
      <Contact key={id} id={contact.id} name={contact.name} peerId={contact.peerId} />
    </div>)
  )
  return (
    <Flex overflowY='scroll' flexDir='column' h='93vh' w='xs'>{CL}</Flex>)
}

export default ContactList
