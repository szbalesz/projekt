import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Stack,
  Button,
  Link as ChakraLink,
  Text,
  Input,
  AbsoluteCenter,
} from '@chakra-ui/react';
import { Field } from "../components/ui/field"
import { Checkbox } from "../components/ui/checkbox"
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput } from "../components/ui/password-input"

export default function Login({ isLoggedin, onLogin}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    if(isLoggedin){
      navigate("/")
    }
  }, [])
  
  return (
    <>
      <Flex display={{ base: "block", md: "flex"}} justifyContent="center">
        <AbsoluteCenter>
            <Stack spacing={8} mx="auto" px={6}>
            <Box rounded="lg" w="350px" bg="bg" boxShadow="0 0 50px 0px #99f6e4"  px={8} py={5}>
                <Heading textAlign="center" color="teal.500" w="50%" borderRadius="25px" mx="auto" my="3" p="1">Bejelentkezés</Heading>
                <Stack spacing={4}>
                <Field label="Felhasználónév">
                    <Input type="text" value={username} onChange={(q) => setUsername(q.target.value)} placeholder="Add meg a felhasználóneved" />
                </Field>
                <Field label="Jelszó">
                    <PasswordInput type="password" value={password} onChange={(q) => setPassword(q.target.value)} placeholder="Add meg a jelszavad"
                    />
                </Field>
                <Field my="2">
                    <Checkbox colorPalette="teal">
                    Maradjon bejelentkezve
                    </Checkbox>
                </Field>
                <ChakraLink colorPalette="teal">Elfelejtett jelszó?</ChakraLink>
                <Button onClick={()=> onLogin(username,password)} colorPalette="teal"  color="white" mt={4} mb={3}>
                    Bejelentkezés
                </Button>
                </Stack>
            </Box>
            <Text textAlign="center">
                Ha még nincs fiókod <Link to={"/register"} style={{color: "#2dd4bf"}}>Regisztrálj</Link>!
            </Text>
            </Stack>
        </AbsoluteCenter>
        </Flex>
    </>
  )
}
