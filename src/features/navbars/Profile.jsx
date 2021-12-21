import { ArrowBackIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

export const ProfileNav = ({ userId }) => {
  const history = useHistory()
  return (
    <Flex p='1.5' w='100%' flexDirection='column'>
      <Flex p='2' align='center'>
        <IconButton
          position='absolute'
          mr='2'
          display={['block', null, 'none']}
          variant='link'
          onClick={() => history.push('/', {})}
          icon={<ArrowBackIcon />}
        />
        <Heading flexGrow='1' textAlign='center' size='lg'>
          {userId}
        </Heading>
      </Flex>
    </Flex>
  )
}
