import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Stack,
  Button,
  Text,
  Input,
  AbsoluteCenter,
} from '@chakra-ui/react';
import { Field } from "../components/ui/field"
import { Link } from 'react-router-dom';
import { PasswordInput } from "../components/ui/password-input"


export default function Register() {
  return (
    <>
      <Flex display={{ base: "block", md: "flex"}} justifyContent="center">
        <AbsoluteCenter>
            <Stack spacing={8} mx="auto" px={6}>
            <Box rounded="lg" w="350px" bg="bg" boxShadow="0 0 50px 0px #99f6e4"  px={8} py={5}>
                <Heading textAlign="center" color="teal.500" w="50%" borderRadius="25px" mx="auto" my="3" p="1">Regisztráció</Heading>
                <Stack spacing={4}>
                <Field label="Felhasználónév">
                    <Input type="text" name="email" placeholder="Add meg a felhasználóneved" />
                </Field>
                <Field label="E-mail">
                    <Input type="email" name="email" placeholder="Add meg az e-mailedet" />
                </Field>
                <Field label="Jelszó">
                    <PasswordInput type="password" placeholder="Add meg a jelszavad"/>
                </Field>
                <Field label="Jelszó újra">
                    <PasswordInput type="password" placeholder="Add meg a jelszavad újra"/>
                </Field>
                <Button colorPalette="teal" color="white" mt={4} mb={3}>
                    Regisztráció
                </Button>
                </Stack>
            </Box>
            <Text textAlign="center">
                Ha már van fiókod  <Link to={"/login"} style={{color: "#2dd4bf"}}> Jelentkezz be</Link>!
            </Text>
            </Stack>
        </AbsoluteCenter>
        </Flex>
    </>
  )
}
