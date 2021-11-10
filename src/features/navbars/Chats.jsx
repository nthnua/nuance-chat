import { SearchIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'

export const ChatNavbar = () => {
  const colorMode = window.localStorage.getItem('chakra-ui-color-mode')

  return (
    <Flex p='1.5' w='100%'>
      <InputGroup
        rounded='lg'
        overflow='hidden'
        bg={colorMode === 'dark' ? 'blackAlpha.300' : 'whiteAlpha.700'}
      >
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.300' />
        </InputLeftElement>
        <Input
          type='tel'
          placeholder='Search away!'
          rounded='lg'
          overflow='hidden'
        />
      </InputGroup>
    </Flex>
  )
}
