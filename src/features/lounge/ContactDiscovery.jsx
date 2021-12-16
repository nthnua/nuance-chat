import { SearchIcon } from '@chakra-ui/icons'
import {
  Divider,
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
  const borderColor = useColorModeValue('green.300', 'green.700')
  const colorMode = window.localStorage.getItem('chakra-ui-color-mode')

  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const selfId = useSelector(state => state.auth.session.id)

  useEffect(() => {
    socket.removeAllListeners('searchResults')
    socket.on('searchResults', data => setSearchResults(data))
  }, [socket])

  const searchContact = (e) => {
    e.preventDefault()
    socket.emit('searchContact', searchText)
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
          <Box m='2'>
            <form onSubmit={searchContact}>
              <InputGroup
                rounded='md'
                overflow='hidden'
                bg={colorMode === 'dark' ? 'blackAlpha.300' : 'whiteAlpha.700'}
              >
                <InputLeftElement pointerEvents='none'>
                  <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  type='tel'
                  placeholder='Search away!'
                  rounded='lg'
                  overflow='hidden'
                />
              </InputGroup>
            </form>
          </Box>
          <Divider />
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
