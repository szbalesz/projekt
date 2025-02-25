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
import api from '../services/Api'
import Cookies from "js-cookie";
import { LuPen } from 'react-icons/lu'

export default function EditPlaylistWindow({ getPlaylist, playlist }) {
    const token = Cookies.get("token");
    const themecolor = localStorage.getItem("themecolor");
    const [playlistName, setPlaylistName] = useState(playlist.playlistName);
    const [imageUrl, setImageUrl] = useState(playlist.imageUrl);
    const [open, setOpen] = useState(false)

    const editPlaylist = async()=>{
        api.put("/playlist/"+playlist.id,{imageUrl,playlistName},{
            headers: {
              Authorization: `Bearer ${token}`
          }
          })
          .then(()=>{
            toaster.create({ title: `Sikeres módosítás!`, type: "success" });
            getPlaylist();
            setOpen(false);
          })
          .catch((e)=>{
            console.error("Hiba történt a lista hozzáadása közben: ",e);
          })
    }

    return (
        // Új lejátszási lista ablak
        <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={"center"}>
            <DialogTrigger mx={"auto"} asChild>
            <MenuItem value="szerkeszt"><LuPen/>Adatok szerkesztése</MenuItem>
            </DialogTrigger>
            <DialogBackdrop onClick={()=>setOpen(false)}/>
            <DialogContent>
            <Theme colorPalette={themecolor} display={"flex"} flexDirection={"column"} bg={"Background"} h={"100%"}>
                <DialogHeader>
                    <DialogTitle>Adatok szerkesztése</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        if(token){
                            editPlaylist();
                        }
                    }}>
                        <Flex direction={"row"} pb={"3"}>
                            <Button borderRadius="lg" variant="ghost" height="150px" width="150px" backgroundPosition="center" backgroundImage={"url("+imageUrl+")"} backgroundSize="cover" boxShadow={`0 0 15px 0 ${themecolor}`}/>
                            <Flex width={"full"} direction={"column"} p={"5"}>
                                <Input required value={playlistName} onChange={(e)=> setPlaylistName(e.target.value)} placeholder="Írd be az új nevet" />
                                <Input required value={imageUrl} onChange={(e)=> setImageUrl(e.target.value)} my={"5"} placeholder="Új kép elérési útja" />
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
