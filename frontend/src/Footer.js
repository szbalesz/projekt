import React from "react";
import { Box, Container, Flex, HStack, Image, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import { FaGithub, FaTrello } from "react-icons/fa";
import logo from "./media/logo.png"
import { Link } from "react-router-dom";

export default function Footer({currentMusic}) {
  return (
    <Box as="footer" bg="background" py={8} mt="auto" borderTopWidth={"1px"}>
      <Container>
        {/* Felső szakasz */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          justifyContent="space-between"
          align="center"
          borderBottom="1px solid"
          borderColor="gray.700"
          pb={6}
        >
          {/* Logo */}
          <HStack spacing={3} mb={{ base: 6, lg: 0 }}>
            <Image src={logo} style={{
                  pointerEvents: "none",
                  height: "65px",
                  padding: "0px",
                  filter: "brightness(100%) saturate(0%) contrast(0%)",
              }}>
                
            </Image>
          </HStack>


          {/* Social ikonok */}
          <HStack spacing={4} fontSize="xl">
            <ChakraLink href="https://github.com/szbalesz/projekt" _hover={{ color: "gray.400" }}>
              <FaGithub />
            </ChakraLink>
            <ChakraLink href="https://trello.com/b/V8N52JBN/projekt" _hover={{ color: "gray.400" }}>
              <FaTrello />
            </ChakraLink>
          </HStack>
        </Flex>

        {/* Alsó szakasz */}
        <Stack
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          align="center"
          mt={6}
          pb={currentMusic? { base: "120px", md: "60px" } : { base: "60px", lg: "0" }}
          fontSize="sm"
          color="gray.400"
        >
          <Text>© 2025 MelodyFlow, Inc. Minden jog fenntartva.</Text>
          <HStack spacing={4}>
            <Link to="/about" >
              <ChakraLink as={"span"}>
                Rólunk
              </ChakraLink>
            </Link>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
