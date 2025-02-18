import React, { useState } from 'react'
import { Button, Flex, Image, Text, Theme } from "@chakra-ui/react"
import {
    DialogActionTrigger,
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
import api from '../Api'
import Cookies from "js-cookie";

export default function PlaylistWindow({ userid, getPlaylists}) {
    const token = Cookies.get("token");
    const themecolor = localStorage.getItem("themecolor");
    const [playlistName, setPlaylistName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [open, setOpen] = useState(false)
    return (
        <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={"center"}>
            <DialogTrigger mx={"auto"} asChild>
                <Button variant={"surface"} onClick={()=> setOpen(true)} mx={"5"}>Lejátszási lista létrehozása</Button>
            </DialogTrigger>
            <DialogBackdrop onClick={()=>setOpen(false)}/>
            <DialogContent>
            <Theme colorPalette={themecolor} display={"flex"} flexDirection={"column"} bg={"Background"} h={"100%"}>
                <DialogHeader>
                    <DialogTitle>Részletek szerkesztése</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={(a) => {
                        a.preventDefault();
                        let newPlaylist = {
                            playlistName: playlistName,
                            imageUrl: imageUrl,
                            creatorId: userid,
                        }
                        api.post("/CreatePlaylist",newPlaylist, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                            })
                        .then((res)=>{
                            toaster.create({ title: "Sikeres létrehozás.", type: "success" });
                            const newPlaylistId = res.data.id;
                            const creatorId = res.data.creatorId;
                            api.post("/AddPlaylistToUser",{playlistId: newPlaylistId,userId: creatorId},{
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                            })
                            .then(()=>{
                                setPlaylistName("");
                                setImageUrl("");
                                getPlaylists();
                                setOpen(false);
                            })
                            
                        })
                        .catch((e)=>{
                            toaster.create({ title: "Hiba történt.", type: "error" });
                            console.error("Hiba történt a lejátszási lista elkészítése alatt: ",e)
                        })
                    }}>
                        <Flex direction={"row"} pb={"3"}>
                            <Image src={imageUrl? imageUrl : null} minWidth={"150px"} height={"150px"} />
                            <Flex width={"full"} direction={"column"} p={"3"}>
                                <Input required value={playlistName} onChange={(e)=> setPlaylistName(e.target.value)} placeholder="Írd be a nevet" />
                                <Input required value={imageUrl} onChange={(e)=> setImageUrl(e.target.value)} my={"5"} placeholder="Kép elérési útja" />
                            </Flex>
                        </Flex>
                        <Flex>
                            <Text fontSize={"xs"}>A folytatással engedélyezed, hogy a MelodyFlow hozzáférhessen az általad feltöltött képhez. Ügyelj arra, hogy legyen jogosultságod feltölteni a képet.</Text>
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
