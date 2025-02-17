import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Stack,
  Button,
  Text,
  Input,
  AbsoluteCenter,
  Span,
} from '@chakra-ui/react';
import { Field } from "../components/ui/field"
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput } from "../components/ui/password-input"
import { toaster } from '../components/ui/toaster';
import Cookies from "js-cookie"

export default function Register({ isLoggedin, onRegister }) {
    const themecolor = localStorage.getItem("themecolor");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
      if(isLoggedin || Cookies.get("token")){
        navigate("/")
      }
    }, [])
  return (
    <>
      <Flex display={{ base: "block", md: "flex"}} justifyContent="center">
        <AbsoluteCenter>
            <Stack spacing={8} mx="auto" px={6}>
            <Box rounded="lg" w="350px" bg="bg" boxShadow={`0 0 50px 0px ${themecolor}`} px={8} py={5}>
                <Heading textAlign="center" color="colorpalette.solid" w="50%" borderRadius="25px" mx="auto" my="3" p="1">Regisztráció</Heading>
                <form onSubmit={(f) => {
                    f.preventDefault();
                    if(username.length >= 4){
                        if(email.length > 2 && email.includes(".")){
                            if(password.length >= 6){
                            if(password === passwordAgain){
                                onRegister(username,email,password);
                            }
                            else{
                                toaster.create({
                                title: `A két jelszó nem egyezik.`,
                                type: "error",
                            })
                            }
                        }
                        else{
                            toaster.create({
                            title: `Jelszó minimum 6 karakter.`,
                            type: "error",
                        })
                        }
                        }
                        else{
                            toaster.create({
                            title: `Adjon meg egy valós email címet.`,
                            type: "error",
                        })
                        }
                    }
                    else{
                        toaster.create({
                        title: `Felhasználónév minimum 4 karakter.`,
                        type: "error",
                    })
                    }
                }}>
                    <Stack spacing={4}>
                    <Field label="Felhasználónév">
                        <Input type="text" name="username" onChange={(q) => setUsername(q.target.value)} placeholder="Add meg a felhasználóneved" />
                    </Field>
                    <Field label="Email">
                        <Input type="email" name="email" onChange={(q) => setEmail(q.target.value)} placeholder="Add meg az emailedet" />
                    </Field>
                    <Field label="Jelszó">
                        <PasswordInput onChange={(q) => setPassword(q.target.value)} placeholder="Add meg a jelszavad"/>
                    </Field>
                    <Field label="Jelszó újra">
                        <PasswordInput onChange={(q) => setPasswordAgain(q.target.value)} placeholder="Add meg a jelszavad újra"/>
                    </Field>
                    <Button type="submit"  color="white" mt={4} mb={3}>
                        Regisztráció
                    </Button>
                    </Stack>
                </form>
            </Box>
            <Text textAlign="center">
                Ha már van fiókod  <Link to={"/login"}><Span color={"colorPalette.solid"}>Jelentkezz be</Span></Link>!
            </Text>
            </Stack>
        </AbsoluteCenter>
        </Flex>
    </>
  )
}
