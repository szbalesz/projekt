import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Stack,
  Button,
  Link,
  Text,
  Input,
  AbsoluteCenter,
} from '@chakra-ui/react';
import { Field } from "../components/ui/field"
import { InputGroup } from '../components/ui/input-group';
import { Checkbox } from "../components/ui/checkbox"


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <Flex display={{ base: "block", md: "flex"}} justifyContent="center">
        <AbsoluteCenter>
            <Stack spacing={8} mx="auto" px={6}>
            <Box rounded="lg" w="350px" bg="bg" boxShadow="0 0 50px 0px #99f6e4"  px={8} py={5}>
                <Heading textAlign="center" color="teal.500" w="50%" borderRadius="25px" mx="auto" my="3" p="1">Bejelentkezés</Heading>
                <Stack spacing={4}>
                <Field label="Felhasználónév">
                    <Input type="text" name="email" placeholder="Add meg a felhasználóneved" />
                </Field>
                <Field label="Jelszó">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Add meg a jelszavad"
                    />
                </Field>
                <Field my="2">
                    <Checkbox colorScheme="teal" color="white">
                    Maradjon bejelentkezve
                    </Checkbox>
                </Field>
                <Link colorPalette="teal">Elfelejtett jelszó?</Link>
                <Button colorPalette="teal" color="white" mt={4} mb={3}>
                    Bejelentkezés
                </Button>
                </Stack>
            </Box>
            <Text textAlign="center">
                Ha még nincs fiókod akkor <Link colorPalette="teal">Regisztrálj</Link>!
            </Text>
            </Stack>
        </AbsoluteCenter>
        </Flex>
    </>
  )
}
