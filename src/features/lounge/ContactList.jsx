import { Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import Contact from './Contact'

const ContactList = () => {

    const contacts = useSelector(state => state.lounge.contacts)
    const CL = contacts.map((contact,id)=><Contact key={id} name={contact.name}/>)
    console.log(CL)
    return (
        <Flex flexDir='column' h='100vh' w='xs' bg='teal.100'>{CL}</Flex>)
}

export default ContactList