import { Button, Center, Flex, Heading, Text, } from '@chakra-ui/react'
import React from 'react'
import { LuUser } from 'react-icons/lu'

export default function ProfileSettings() {
    return (
        <Center padding={"25px"} height={"100%"}>
            <Flex width={"3xl"} direction={"column"}>
                <Heading py={"3"} size={"3xl"}>Személyes adatok szerkesztése</Heading>
                <hr />
                <Heading py={"3"} size={"1xl"}>Jelenlegi bejelentkezési módok</Heading>
                <Flex p={"3"} rounded={"md"} maxWidth={"md"} background={"bg.muted"} pb={"3"} direction={"column"}>
                    <Flex>
                        <LuUser size={"25"} />
                        <Heading px={"3"}>
                            Felhasználónév és jelszó
                        </Heading>
                    </Flex>
                    <hr></hr>
                    <Flex direction={"row"} justifyContent={"space-between"} pt={"3"}>
                        <Flex direction={"column"}>
                        <Text>
                            Felhasználónév
                        </Text>
                        <Text color={"teal.400"} fontSize={"13px"}>
                            példa@kkszki.hu
                        </Text>
                        </Flex>
                        <Flex pt={"2"} px={"3"}>
                        <Button  size={"sm"} colorPalette={"teal"} variant={"ghost"}>Frissítés</Button>
                        </Flex>
                    </Flex>
                    <Flex direction={"row"} justifyContent={"space-between"} pt={"3"}>
                        <Flex direction={"column"}>
                        <Text>
                            Jelszó
                        </Text>
                        <Text color={"teal.400"} fontSize={"13px"}>
                            ********
                        </Text>
                        </Flex>
                        <Flex pt={"2"} px={"3"}>
                        <Button  size={"sm"} colorPalette={"teal"} variant={"ghost"}>Frissítés</Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Center>
    )
}
