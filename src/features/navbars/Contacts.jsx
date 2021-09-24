import { Flex, Text, useColorModeValue, Avatar } from '@chakra-ui/react'

export const ContactsNavbar = () => {
  const bgColor = useColorModeValue('#87E0E1', '#5A8D98')
  return (
    <Flex p='2' bg={bgColor} justify='space-between' flexDir='row' h='min-content' position='sticky' zIndex='sticky' top='0' w='100%'>
      <Text alignSelf='center'>Rinsme</Text>
      <Avatar />
    </Flex>
  )
}
