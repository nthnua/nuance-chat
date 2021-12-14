import { ArrowBackIcon, SearchIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'

export const Discovery = ({setContactDisc}) => {
  const colorMode = window.localStorage.getItem('chakra-ui-color-mode')

  return (
    <Flex p='1.5' w='100%' flexDirection='column'>
      <Flex mb='2' p='2' align='center'>
        <IconButton
          position='absolute'
          mr='2'
          display='block'
          variant='link'
          onClick={() => setContactDisc(false)}
          icon={<ArrowBackIcon />}
        />
        <Heading flexGrow='1' textAlign='center' size='md'>
          Add contacts
        </Heading>
      </Flex>
      <InputGroup
        rounded='md'
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
