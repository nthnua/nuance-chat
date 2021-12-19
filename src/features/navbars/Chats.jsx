import { SearchIcon } from '@chakra-ui/icons'
import { Flex, useColorModeValue } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'

export const ChatNavbar = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <Flex p='3' w='100%'>
      <InputGroup rounded='lg' overflow='hidden' bg={bgColor}>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.500' />
        </InputLeftElement>
        <Input
          border='none'
          color={textColor}
          type='tel'
          placeholder='Search away!'
          rounded='lg'
          overflow='hidden'
        />
      </InputGroup>
    </Flex>
  )
}
