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
  Span,
} from '@chakra-ui/react';
import { Field } from "../components/ui/field"
import { Checkbox } from "../components/ui/checkbox"
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput } from "../components/ui/password-input"
import Cookies from "js-cookie"

export default function Login({ isLoggedin, onLogin }) {
  const themecolor = localStorage.getItem("themecolor");
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    if(isLoggedin || Cookies.get("token")){
      navigate(-1)
    }
  }, [])
  
  return (
    <>
    {/* Bejelentkezés */}
      <Flex display={{ base: "block", md: "flex"}} justifyContent="center">
        <AbsoluteCenter>
            <Stack spacing={8} mx="auto" px={6}>
            <Box rounded="lg" w="350px" bg="bg" boxShadow={`0 0 50px 0px ${themecolor}`}  px={8} py={5}>
                <Heading textAlign="center" color={"colorPalette.solid"} w="50%" borderRadius="25px" mx="auto" my="3" p="1">Bejelentkezés</Heading>
                <Stack spacing={4}>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    onLogin(username,password);
                  }}>
                  <Field label="Felhasználónév">
                    <Input type="text" value={username} onChange={(q) => setUsername(q.target.value)} placeholder="Add meg a felhasználóneved" />
                </Field>
                <Field label="Jelszó">
                    <PasswordInput type="password" value={password} onChange={(q) => setPassword(q.target.value)} placeholder="Add meg a jelszavad"
                    />
                </Field>
                <Field my="2">
                    <Checkbox>
                    Maradjon bejelentkezve
                    </Checkbox>
                </Field>
                <Flex justifyContent={"space-between"}>
                <ChakraLink>Elfelejtett jelszó?</ChakraLink>
                <Button type={"submit"} mt={4} mb={3}>
                    Bejelentkezés
                </Button>
                </Flex>
                  </form>
                </Stack>
            </Box>
            <Text textAlign="center">
                Ha még nincs fiókod <Link to={"/register"}><Span color={"colorPalette.solid"}>Regisztrálj</Span></Link>!
            </Text>
            </Stack>
        </AbsoluteCenter>
        </Flex>
      </>
  )
}
