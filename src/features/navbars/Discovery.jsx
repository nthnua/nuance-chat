import { ArrowBackIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton } from '@chakra-ui/react'

export const Discovery = ({ setContactDisc }) => {
  return (
    <Flex p='1.5' w='100%' flexDirection='column'>
      <Flex p='2' align='center'>
        <IconButton
          position='absolute'
          mr='2'
          display='block'
          variant='link'
          onClick={() => setContactDisc(false)}
          icon={<ArrowBackIcon />}
        />
        <Heading flexGrow='1' textAlign='center' size='md'>
          Discover
        </Heading>
      </Flex>
    </Flex>
  )
}
