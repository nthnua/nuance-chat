import { ArrowBackIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton, useColorModeValue } from '@chakra-ui/react'

export const Discovery = ({ setContactDisc }) => {
  return (
    <Flex p='4' w='100' justify='center' flexDirection='column'>
      <IconButton
        position='absolute'
        mr='2'
        display='block'
        variant='link'
        onClick={() => setContactDisc(false)}
        icon={<ArrowBackIcon />}
      />
      <Heading color={useColorModeValue('gray.700', 'gray.200')} flexGrow='1' textAlign='center' fontWeight='semibold' size='md'>
        Discover
      </Heading>
    </Flex>
  )
}
