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

export default function EditPicture({account}) {
    const [imageUrl, setImageUrl] = useState("");
    const themecolor = localStorage.getItem("themecolor");
    const [open, setOpen] = useState(false)
    return (
        <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={"center"}>
            <DialogTrigger asChild>
            <Button
            zIndex={"2"}
            boxShadowColor={"colorPalette"}
            boxShadow={"0 0 25px 0"}
            backgroundImage={`url(${account?.profilePictureURL})`}
            boxSize={"150px"}
            variant={"outline"}
            borderRadius={"full"}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            fit={"cover"}
          />
            </DialogTrigger>
            <DialogBackdrop onClick={()=>setOpen(false)}/>
            <DialogContent>
            <Theme colorPalette={themecolor} display={"flex"} flexDirection={"column"} bg={"Background"} h={"100%"}>
                <DialogHeader>
                    <DialogTitle>Profilkép szerkesztése</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form>
                        <Flex direction={"row"} pb={"3"}>
                            <Button borderRadius="lg" variant="ghost" height="150px" width="150px" backgroundPosition="center" backgroundImage={"url("+(imageUrl)+")"} backgroundSize="cover" boxShadow={`0 0 15px 0 ${themecolor}`}/>
                            <Flex width={"full"} direction={"column"} p={"5"}>
                                <Input required value={imageUrl} onChange={(e)=> setImageUrl(e.target.value)} my={"5"} placeholder="Kép elérési útja" />
                            </Flex>
                        </Flex>
                        <Flex justifyContent={"right"}>
                            <Button  type='submit'>Mentés</Button>
                        </Flex>
                    </form>
                </DialogBody>
                <DialogCloseTrigger onClick={()=>setOpen(false)} />
                </Theme>
            </DialogContent>
        </DialogRoot>
    )
}
