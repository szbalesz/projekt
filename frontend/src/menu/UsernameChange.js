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
import { changeUsername } from '../services/UserService'
import { toaster } from '../components/ui/toaster'

export default function UsernameChange({openbutton,userid,currentusername,load}) {
    const themecolor = localStorage.getItem("themecolor");
    const [newusername, setNewUserName] = useState("");
    const [open, setOpen] = useState(false)
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={"center"}>
            <DialogTrigger mx={"auto"} asChild>
            {openbutton}
            </DialogTrigger>
            <DialogContent border="10px solid" borderColor="bg" rounded="xl">
            <Theme colorPalette={themecolor} display={"flex"} flexDirection={"column"} bg={"Background"} h={"100%"}>
                <DialogHeader>
                    <DialogTitle>Felhasználónév módosítása</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        if(newusername !== currentusername)
                        {
                            if(newusername.length >= 6){
                                changeUsername(userid,toaster,newusername,load);
                                setOpen(false);
                                setNewUserName("");
                            }
                            else{
                                toaster.create({
                                title: `Az új felhasználónévnek legalább 6 karakter hósszúnak kell lennie.`,
                                type: "error",
                            })
                            }
                        }
                        else{
                            toaster.create({
                                title: `Már ez a jelenlegi felhasználóneved!`,
                                type: "error",
                            })
                        }
                    }}>
                        <Flex direction={"row"} pb={"3"}>
                            <Flex width={"full"} direction={"column"} py={"5"}>
                            <Field mb="2" py="1" label="Jelenlegi felhasználónév">
                            <Input disabled value={currentusername}/>
                            </Field>
                            <Field py="1" label="Új felhasználónév">
                            <Input required value={newusername} onChange={(e)=> setNewUserName(e.target.value)} placeholder="Add meg az új felhasználóneved." />
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
