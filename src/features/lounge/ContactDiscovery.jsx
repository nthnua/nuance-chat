import { SearchIcon } from '@chakra-ui/icons'
import {
  Flex,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Discovery } from '../navbars/Discovery'
import Contact from './Contact'

function ContactDiscovery ({ setContactDisc, socket }) {
  const borderColor = useColorModeValue('white', 'gray.700')
  const searchTextColor = useColorModeValue('gray.600', 'gray.300')
  const bgColor = useColorModeValue('gray.100', 'blackAlpha.300')

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const selfId = useSelector(state => state.auth.session.id)

  useEffect(() => {
    socket.removeAllListeners('searchResults')
    socket.on('searchResults', data => setSearchResults(data.searchResults))
  }, [socket])

  const searchContact = e => {
    e.preventDefault()
    socket.emit('searchContact', { searchQuery })
  }

  const CL = searchResults.map((contact, id) => {
    return (
      contact.id !== selfId && (
        <Contact
          key={id}
          id={contact.id}
          name={contact.name}
          peerId={contact.peerId}
        />
      )
    )
  })

  return (
    <Flex minW='35vw' grow={['1', null, '0']}>
      <Flex
        grow='1'
        overflow='hidden'
        rounded={['md', null, 'xl']}
        mr={[0, null, 3]}
        boxShadow='xl'
        position='relative'
      >
        <Flex
          grow='1'
          rounded='xl'
          backgroundColor={borderColor}
          flexDir='column'
        >
          <Discovery setContactDisc={setContactDisc} />
          <Box rounded='lg' overflow='hidden' m='3' mt='1'>
            <form onSubmit={searchContact}>
              <InputGroup rounded='lg' overflow='hidden' bg={bgColor}>
                <InputLeftElement pointerEvents='none'>
                  <SearchIcon color='gray.500' />
                </InputLeftElement>
                <Input
                  border='none'
                  color={searchTextColor}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  type='tel'
                  placeholder='Search away!'
                  rounded='lg'
                  overflow='hidden'
                />
              </InputGroup>
            </form>
          </Box>
          <Flex flexDir='column' overflow='auto'>
            {/* <FeelingLucky /> */}
            {CL}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ContactDiscovery
