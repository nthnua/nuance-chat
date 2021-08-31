import { Flex, Text,Icon, Avatar, Tag } from '@chakra-ui/react'
import {IoMdContact} from 'react-icons/io'

const Contact = ({ name }) => {
    console.log(name)
    return <Flex cursor='pointer' align='center' fontSize='lg' p='2' h='14'>
   <Avatar>
        <Icon m='4' as={IoMdContact} w='12' h='12'/></Avatar>
        <Text px='2'>{name}</Text>

    </Flex>
}

export default Contact