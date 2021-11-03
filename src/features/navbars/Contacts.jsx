import { Flex, useColorModeValue, Avatar } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/layout";
export const ContactsNavbar = () => {
  const bgColor = useColorModeValue("#87E0E1", "#5A8D98");
  return (
    <Flex
      p="2"
      px="4"
      bg={bgColor}
      justify="space-between"
      flexDir="row"
      shadow="0 2px 10px 1px rgba(0,0,0,0.15)"
    >
      <Heading contentEditable size="sm" alignSelf="center">
        Not John Doe
      </Heading>
      <Avatar />
    </Flex>
  );
};
