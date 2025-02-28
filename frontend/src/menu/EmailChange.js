import React, { useState } from 'react'
import { Button, Flex, Text, Theme } from "@chakra-ui/react"
import {
    DialogBackdrop,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "@chakra-ui/react"
import { Field } from '../components/ui/field'

export default function EmailChange({currentemail}) {
    const themecolor = localStorage.getItem("themecolor");
    const [newemail, setNewEmail] = useState("");
    const [open, setOpen] = useState(false)
    const prevImg = "https://t3.ftcdn.net/jpg/04/62/60/80/360_F_462608080_J2AJrf8h0fmbFqnTVUQfza8JivYOfShz.jpg";
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={"center"}>
            <DialogTrigger mx={"auto"} asChild>
            <Button  size={"sm"} color={"colorPalette.solid"} variant={"ghost"}>Frissítés</Button>
            </DialogTrigger>
            <DialogBackdrop onClick={()=>setOpen(false)}/>
            <DialogContent>
            <Theme colorPalette={themecolor} display={"flex"} flexDirection={"column"} bg={"Background"} h={"100%"}>
                <DialogHeader>
                    <DialogTitle>Email módosítása</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form>
                        <Flex direction={"row"} pb={"3"}>
                            <Flex width={"full"} direction={"column"} p={"5"}>
                            <Field mb="2" py="1" label="Jelenlegi email cím">
                            <Input disabled value={currentemail}/>
                            </Field>
                            <Field py="1" label="Új email cím">
                            <Input required value={newemail} onChange={(e)=> setNewEmail(e.target.value)} placeholder="Add meg az új email címed." />
                            </Field>
                            </Flex>
                        </Flex>
                        <Flex justifyContent={"right"}> 
                            <Button type='submit'>Mentés</Button>
                        </Flex>
                    </form>
                </DialogBody>
                <DialogCloseTrigger onClick={()=>setOpen(false)} />
                </Theme>
            </DialogContent>
        </DialogRoot>
  )
}
