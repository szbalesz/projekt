import React, { useEffect, useState } from 'react'
import { Button, Flex, Theme } from "@chakra-ui/react"
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
import { toaster } from '../components/ui/toaster';
import { Input } from "@chakra-ui/react"
import { changeProfilePicture } from '../services/UserService';

export default function EditPicture({userid,openbutton,profilePictureURL,load}) {
    const [imageUrl, setImageUrl] = useState("");
    const themecolor = localStorage.getItem("themecolor");
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setImageUrl(profilePictureURL || "");
    }, [profilePictureURL])
    
    return (
        <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={"center"}>
            <DialogTrigger asChild>
            {openbutton}
            </DialogTrigger>
            <DialogContent border="10px solid" borderColor="bg" rounded="xl">
            <Theme colorPalette={themecolor} display={"flex"} flexDirection={"column"} bg={"Background"} h={"100%"}>
                <DialogHeader>
                    <DialogTitle>Profilkép szerkesztése</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        //Ha adott meg új urlt
                        if(imageUrl !== profilePictureURL){
                            // Megváltoztatja a profilképet
                            changeProfilePicture(userid,imageUrl,toaster,setOpen,load);
                        }
                    }}>
                        <Flex direction={"row"} pb={"3"}>
                            <Button borderRadius="full" variant="ghost" height="150px" width="150px" backgroundPosition="center" backgroundImage={"url("+(imageUrl)+")"} backgroundSize="cover" boxShadow={`0 0 15px 0 ${themecolor}`}/>
                            <Flex width={"full"} direction={"column"} p={"5"}>
                                <Input value={imageUrl} onChange={(e)=> setImageUrl(e.target.value)} my={"5"} placeholder="Kép elérési útja" />
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
