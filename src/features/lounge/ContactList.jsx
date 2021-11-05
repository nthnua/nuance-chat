import { Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Box } from '@chakra-ui/layout'
import Contact from './Contact'
import { useColorModeValue } from '@chakra-ui/color-mode'

const ContactList = ({ contacts }) => {
  const borderColor = useColorModeValue('green.200', 'green.700')
  const hoverColor = useColorModeValue('green.100', 'green.500')
  const selfId = useSelector((state) => state.auth.session.id)

  const CL = contacts.map((contact, id) =>
    contact.id === selfId
      ? null
      : (
        <Box
          key={`p_${id}`}
          p='1'
          m='1'
          rounded='lg'
          transition='ease-in 100ms'
          _hover={{ bgColor: hoverColor }}
        >
          <Contact key={id} id={contact.id} name={contact.name} peerId={contact.peerId} />
        </Box>
        )
  )
  return (
    <Flex overflow='hidden' rounded='xl' mr='3' boxShadow='xl'>
      <Flex
        rounded='xl'
        width='sm'
        overflow='auto'
        backgroundColor={borderColor}
        flexDir='column'
      >
        {CL}
      </Flex>
    </Flex>
  )
}

export default ContactList
