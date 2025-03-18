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
import { changeEmail } from '../services/UserService'
import { toaster } from '../components/ui/toaster'

export default function EmailChange({openbutton,userid,currentemail,load}) {
    const themecolor = localStorage.getItem("themecolor");
    const [newemail, setNewEmail] = useState("");
    const [open, setOpen] = useState(false)
  return (
    // Email módosító felugró ablak
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={"center"}>
            <DialogTrigger mx={"auto"} asChild>
            {openbutton}
            </DialogTrigger>
            <DialogContent border="10px solid" borderColor="bg" rounded="xl">
            <Theme colorPalette={themecolor} display={"flex"} flexDirection={"column"} bg={"Background"} h={"100%"}>
                <DialogHeader>
                    <DialogTitle>Email módosítása</DialogTitle>
                </DialogHeader>
                <DialogBody>
                <form onSubmit={(e)=>{
                        e.preventDefault();
                        // Email vizsgálata
                        if(newemail !== currentemail)
                        {
                            if(newemail.length > 6){
                                // Email megváltoztatása
                                changeEmail(userid,toaster,newemail,load);
                                setOpen(false);
                                setNewEmail("");
                            }
                            else{
                                toaster.create({
                                title: `Adjon meg egy valós email címet!`,
                                type: "error",
                            })
                            }
                        }
                        else{
                            toaster.create({
                                title: `Már ez a jelenlegi email címed!`,
                                type: "error",
                            })
                        }
                    }}>
                        <Flex direction={"row"} pb={"3"}>
                            <Flex width={"full"} direction={"column"} py={"5"}>
                            <Field mb="2" py="1" label="Jelenlegi email cím">
                            <Input disabled value={currentemail}/>
                            </Field>
                            <Field py="1" label="Új email cím">
                            <Input type='email' required value={newemail} onChange={(e)=> setNewEmail(e.target.value)} placeholder="Add meg az új email címed." />
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
