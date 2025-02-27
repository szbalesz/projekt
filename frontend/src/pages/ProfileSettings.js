import { Button, Center, Flex, Heading, Text, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { LuUser } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import { getUserProfile } from '../services/UserService'

export default function ProfileSettings() {
    const navigate = useNavigate();
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");
    const [account, setAccount] = useState({})

    useEffect(() => {
        const getProfile = async() =>{
            setAccount(await getUserProfile(userid));
        }
        if(!token){
        navigate(-1);
        }
        else{
        getProfile();
        }
    }, [token])
    
    return (
        // Profil beállítások oldal
        <Center padding={"25px"} height={"100%"}>
            <Flex width={"3xl"} direction={"column"}>
                <Heading py={"3"} size={"3xl"}>Személyes adatok szerkesztése</Heading>
                <hr />
                <Heading py={"3"} size={"1xl"}>Jelenlegi bejelentkezési módok</Heading>
                <Flex p={"3"} rounded={"md"} background={"bg.muted"} pb={"3"} direction={"column"}>
                    <Flex>
                        <LuUser size={"25"} />
                        <Heading px={"3"}>
                            Fiók adatai
                        </Heading>
                    </Flex>
                    <hr></hr>
                    <Flex direction={"row"} justifyContent={"space-between"} pt={"3"}>
                        <Flex direction={"column"}>
                        <Text>
                            Felhasználónév
                        </Text>
                        <Text color={"colorPalette.solid"} fontSize={"13px"}>
                            {account.username}
                        </Text>
                        </Flex>
                        <Flex pt={"2"} px={"3"}>
                        <Button  size={"sm"} color={"colorPalette.solid"} variant={"ghost"}>Frissítés</Button>
                        </Flex>
                    </Flex>
                    <Flex direction={"row"} justifyContent={"space-between"} pt={"3"}>
                        <Flex direction={"column"}>
                        <Text>
                            Email
                        </Text>
                        <Text color={"colorPalette.solid"} fontSize={"13px"}>
                            {account.email}
                        </Text>
                        </Flex>
                        <Flex pt={"2"} px={"3"}>
                        <Button  size={"sm"} color={"colorPalette.solid"} variant={"ghost"}>Frissítés</Button>
                        </Flex>
                    </Flex>
                    <Flex direction={"row"} justifyContent={"space-between"} pt={"3"}>
                        <Flex direction={"column"}>
                        <Text>
                            Jelszó
                        </Text>
                        <Text color={"colorPalette.solid"} fontSize={"13px"}>
                            ********
                        </Text>
                        </Flex>
                        <Flex pt={"2"} px={"3"}>
                        <Button  size={"sm"} color={"colorPalette.solid"} variant={"ghost"}>Frissítés</Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Center>
    )
}
