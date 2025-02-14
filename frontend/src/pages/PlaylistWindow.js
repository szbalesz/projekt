import React from 'react'
import { Button, Flex, Image, Text } from "@chakra-ui/react"
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "@chakra-ui/react"
import { toaster } from '../components/ui/toaster'

export default function PlaylistWindow() {
    return (
        <DialogRoot placement={"center"}>
            <DialogTrigger asChild>
                <Button mx={"5"}>Lejátszási lista létrehozása</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Részletek szerkesztése</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={(a) => {
                        a.preventDefault();
                        toaster.create({ title: "Sikeres létrehozás.", type: "success" });
                    }}>
                        <Flex direction={"row"}>
                            <Image width={"200px"} height={"150px"} />
                            <Flex width={"full"} direction={"column"} p={"3"}>
                                <Input placeholder="Írd be a nevet" />
                                <Input my={"5"} placeholder="Kép elérési útja" />
                            </Flex>
                        </Flex>
                        <Flex>
                            <Text fontSize={"xs"}>A folytatással engedélyezed, hogy a MelodyFlow hozzáférhessen az általad feltöltött képhez. Ügyelj arra, hogy legyen jogosultságod feltölteni a képet.</Text>
                            <DialogActionTrigger asChild>
                                <Button type='submit'>Mentés</Button>
                            </DialogActionTrigger>
                        </Flex>
                    </form>
                </DialogBody>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}
