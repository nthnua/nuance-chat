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
import { Discovery } from '../navbars/Discovery'
import Contact from './Contact'

function ContactDiscovery ({ setContactDisc, socket }) {
  const borderColor = useColorModeValue('white', 'gray.700')
  const searchTextColor = useColorModeValue('gray.700', 'gray.200')
  const bgColor = useColorModeValue('gray.100', 'blackAlpha.300')

  // const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    socket.removeAllListeners('searchResults')
    socket.on('searchResults', data => setSearchResults(data.searchResults))
  }, [socket])

  // const searchContact = e => {
  //   e.preventDefault()
  //   socket.emit('searchContact', { searchQuery })
  // }

  const CL = searchResults.map((contact, idx) => {
    return (
      <Contact
        key={idx}
        fromSearch
        realName={contact.realName}
        name={contact.username}
      />
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
          <Box rounded='lg' overflow='hidden' mx='3' my='1'>
            <InputGroup rounded='lg' overflow='hidden' bg={bgColor}>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.500' />
              </InputLeftElement>
              <Input
                border='none'
                color={searchTextColor}
                // value={searchQuery}
                onChange={e => {
                  if (e.target.value.length > 0) {
                    socket.emit('searchContact', {
                      searchQuery: e.target.value
                    })
                  }
                }}
                type='tel'
                placeholder='Enter a username'
                rounded='lg'
                overflow='hidden'
              />
            </InputGroup>
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
