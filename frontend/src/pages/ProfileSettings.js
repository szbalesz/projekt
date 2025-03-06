import { Button, Center, Flex, Heading, Text, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { LuUser } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { deleteUser, getUserId, getUserProfile } from '../services/UserService'
import UsernameChange from '../menu/UsernameChange'
import EmailChange from '../menu/EmailChange'
import DialogAlert from '../menu/DialogAlert'
import { toaster } from '../components/ui/toaster'
import { getToken } from '../services/AuthService'

export default function ProfileSettings() {
    const navigate = useNavigate();
    const userid = getUserId();
    const [account, setAccount] = useState({})

    useEffect(() => {
        const getProfile = async() =>{
            setAccount(await getUserProfile(userid));
        }
        if(!getToken){
        navigate(-1);
        }
        else{
        getProfile();
        }
    }, [])
    
    return (
        // Profil beállítások oldal
        <Center padding={"25px"} height={"100%"}>
            <Flex width={"3xl"} direction={"column"}>
                <Heading py={"3"} size={"3xl"}>Személyes adatok szerkesztése</Heading>
                <hr />
                <Heading py={"3"} size={"1xl"}>Jelenlegi bejelentkezési módok</Heading>
                <Flex p={"3"} rounded={"md"} background={"bg.muted"} pb={"3"} direction={"column"}>
                    <Flex justifyContent={"space-between"}>
                        <Flex mt={"5px"}>
                        <LuUser size={"25"} />
                        <Heading px={"3"}>
                            Fiók adatai
                        </Heading>
                        </Flex>
                        <Flex>
                        <DialogAlert openButton={<Button mb={"2"} colorPalette={"red"}>Fiók törlése</Button>} title={"Biztosan törölni szeretnéd?"} func={()=> deleteUser(userid,toaster,navigate)} text={"Ez a művelet nem vonható vissza. Ez véglegesen törli a fiókodat a rendszerből."} buttontext={"Törlés"}/>
                        </Flex>
                    </Flex>
                    <hr></hr>
                    <Flex direction={"row"} justifyContent={"space-between"} pt={"3"}>
                        <Flex direction={"column"}>
                        <Text>
                            Felhasználónév
                        </Text>
                        <Text color={"colorPalette.solid"} fontSize={"13px"}>
                            {account?.username}
                        </Text>
                        </Flex>
                        <Flex pt={"2"} px={"3"}>
                        <UsernameChange load={()=> {
                            window.location.reload();
                        }} openbutton={<Button  size={"sm"} color={"colorPalette.solid"} variant={"ghost"}>Frissítés</Button>} userid={userid} currentusername={account?.username}/>
                        </Flex>
                    </Flex>
                    <Flex direction={"row"} justifyContent={"space-between"} pt={"3"}>
                        <Flex direction={"column"}>
                        <Text>
                            Email
                        </Text>
                        <Text color={"colorPalette.solid"} fontSize={"13px"}>
                            {account?.email}
                        </Text>
                        </Flex>
                        <Flex pt={"2"} px={"3"}>
                            <EmailChange openbutton={<Button  size={"sm"} color={"colorPalette.solid"} variant={"ghost"}>Frissítés</Button>} userid={userid} currentemail={account?.email} load={()=> window.location.reload()}/>
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
                        <Button  size={"sm"} color={"colorPalette.solid"} disabled variant={"ghost"}>Frissítés</Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Center>
    )
}
