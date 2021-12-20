import { SearchIcon } from '@chakra-ui/icons'
import { Divider, Flex, useColorModeValue } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'

export const ChatNavbar = () => {
  const textColor = useColorModeValue('gray.700', 'gray.200')

  return (
    <div>
      <Flex p={[2, null, 3]} w='100%'>
        <InputGroup rounded='lg' overflow='hidden' bg='transparent'>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.500' />
          </InputLeftElement>
          <Input
            _focus={{ boxShadow: 'none' }}
            border='none'
            color={textColor}
            type='tel'
            placeholder='Search away!'
            rounded='lg'
            overflow='hidden'
          />
        </InputGroup>
      </Flex>
      <Divider />
    </div>
  )
}
