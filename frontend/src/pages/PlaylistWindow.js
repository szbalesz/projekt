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
          <form>
            <Flex direction={"row"}>
                <Image width={"200px"} height={"150px"}/>
                <Flex width={"full"} direction={"column"} p={"3"}>
                <Input placeholder="Írd be a nevet" />
                <Input my={"5"} placeholder="Kép elérési útja" />
                </Flex>
            </Flex>
            </form>
        </DialogBody>
        <DialogFooter>
            <Text fontSize={"xs"}>A folytatással engedélyezed, hogy a MelodyFlow hozzáférhessen az általad feltöltött képhez. Ügyelj arra, hogy legyen jogosultságod feltölteni a képet.</Text>
          <DialogActionTrigger asChild>
            <Button>Mentés</Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
