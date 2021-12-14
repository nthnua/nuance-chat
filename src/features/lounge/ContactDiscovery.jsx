import { Divider, Flex, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Discovery } from '../navbars/Discovery'

function ContactDiscovery ({setContactDisc}) {
  const borderColor = useColorModeValue('green.300', 'green.700')

  return (
    <Flex minW='35vw' grow={['1', null, '0']}>
      <Flex
        grow='1'
        overflow='hidden'
        rounded={['md', null, 'xl']}
        mr={[0, null, 3]}
        boxShadow='xl'
        position='relative'
      >
        <Flex
          grow='1'
          rounded='xl'
          backgroundColor={borderColor}
          flexDir='column'
        >
          <Discovery setContactDisc={setContactDisc} />
          <Divider />
          <Flex flexDir='column' overflow='auto'></Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ContactDiscovery
