import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Flex, useColorMode } from '@chakra-ui/react'

export const NavBar = () => {
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
        <Flex bg='transparent' position='fixed' zIndex='1' top='0' h='4vh'><ColorModeToggleButton /></Flex>

    )
}