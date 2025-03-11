import React, { useState } from 'react'
import { Button, Flex, MenuItem, Theme } from "@chakra-ui/react"
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
import { toaster } from '../components/ui/toaster'
import { editPlaylist } from "../services/PlaylistService"
import { Field } from '../components/ui/field'
import { getToken } from '../services/AuthService'

export default function EditPlaylistWindow({ openbutton,playlist,load }) {
    const token = getToken();
    const themecolor = localStorage.getItem("themecolor");
    const [playlistName, setPlaylistName] = useState(playlist?.playlistName);
    const [imageUrl, setImageUrl] = useState(playlist?.imageUrl);
    const [open, setOpen] = useState(false)

    return (
        // Új lejátszási lista ablak
        <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={"center"}>
            <DialogTrigger mx={"auto"} asChild>
            {openbutton}
            </DialogTrigger>
            <DialogContent border="10px solid" borderColor="bg" rounded="xl">
            <Theme colorPalette={themecolor} display={"flex"} flexDirection={"column"} bg={"Background"} h={"100%"}>
                <DialogHeader>
                    <DialogTitle>Adatok szerkesztése</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        // Ha be van jelentkezve
                        if(token){
                            // Módosítja a lejátszási lista adatait
                            editPlaylist(playlist,imageUrl,playlistName,toaster,setOpen,load);
                        }
                    }}>
                        <Flex direction={"row"} pb={"3"}>
                            <Button borderRadius="lg" mt="8" variant="ghost" height="150px" width="150px" backgroundPosition="center" backgroundImage={"url("+imageUrl+")"} backgroundSize="cover" boxShadow={`0 0 15px 0 ${themecolor}`}/>
                            <Flex width={"full"} direction={"column"} p={"5"}>
                            <Field py="1" label="Lejátszási lista neve" required helperText="Írd be az új nevet!">
                                <Input required value={playlistName} onChange={(e)=> setPlaylistName(e.target.value)} placeholder="Írd be az új nevet" />
                            </Field>
                            <Field py="1" label="Kép elérési útja" required helperText="Add meg a lejátszási lista képének az elérési útját.">
                                <Input required value={imageUrl} onChange={(e)=> setImageUrl(e.target.value)} placeholder="Új kép elérési útja" />
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
