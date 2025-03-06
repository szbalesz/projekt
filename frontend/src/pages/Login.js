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
import { getToken, onLogin } from "../services/AuthService";
import { toaster } from '../components/ui/toaster';

export default function Login() {
  const themecolor = localStorage.getItem("themecolor");
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [stayLoggedIn, setStayLoggedIn] = useState(false)
  const navigate = useNavigate();
  const isCookieEnabled = localStorage.getItem("Cookie");
  useEffect(() => {
    if(getToken()){
      navigate(-1);
      toaster.create({ title: "Sikeres bejelentkezés!", type: "success" });
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
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const res = await onLogin(username,password,stayLoggedIn);
                    if(res){
                      window.location.reload(); // az oldal frissítése, hogy minden megfelelően működjön
                    }
                  }}>
                  <Field py="3" label="Felhasználónév">
                    <Input type="text" value={username} onChange={(q) => setUsername(q.target.value)} placeholder="Add meg a felhasználóneved" />
                </Field>
                <Field  py="3" label="Jelszó">
                    <PasswordInput type="password" value={password} onChange={(q) => setPassword(q.target.value)} placeholder="Add meg a jelszavad"
                    />
                </Field>
                <Field my="2">
                <Checkbox checked={stayLoggedIn} onCheckedChange={({ checked }) => setStayLoggedIn(checked)} disabled={!isCookieEnabled}>
                    Maradjon bejelentkezve
                    </Checkbox>
                    {!isCookieEnabled? <Text fontSize={"xs"} color={"colorPalette.solid"}>Ehhez a funkcióhoz el kell fogadnod a sütiket!</Text> : null}
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
