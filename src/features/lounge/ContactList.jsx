import { Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import Contact from './Contact'

const ContactList = ({ connect }) => {
  const contacts = useSelector(state => state.lounge.contacts)
  const CL = contacts.map((contact, id) => <Contact key={id} connect={connect} name={contact.name} peerId={contact.peerId} />)
  return (
    <Flex flexDir='column' h='100vh' w='xs'>{CL}</Flex>)
}

export default ContactList
