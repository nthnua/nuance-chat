import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Flex, useColorMode, Text, useColorModeValue } from '@chakra-ui/react'

export const NavBar = () => {
    const bgColor = useColorModeValue('#87E0E1', '#5A8D98')

    const colorMode = localStorage.getItem('chakra-ui-color-mode')
    const { toggleColorMode } = useColorMode()
    const ColorModeToggleButton = () => {
        if (colorMode === 'dark') {
            return <SunIcon focusable onClick={toggleColorMode} />
        }
        else {
            return <MoonIcon focusable onClick={toggleColorMode} />
        }
    }
    return (
        <Flex p='4' bg={bgColor} flexDir='row-reverse' position='static' top='0' w='100%' ><Text fontSize='lg' px='2' position='absolute' left='0'>Rinsme</Text><ColorModeToggleButton /></Flex>

    )
}