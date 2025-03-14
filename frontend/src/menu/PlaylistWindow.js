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
import { toaster } from '../components/ui/toaster'
import { createPlaylist } from '../services/PlaylistService'

export default function PlaylistWindow({load, playlists, userid }) {
    const themecolor = localStorage.getItem("themecolor");
    const [playlistName, setPlaylistName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [open, setOpen] = useState(false)
    const prevImg = "https://t3.ftcdn.net/jpg/04/62/60/80/360_F_462608080_J2AJrf8h0fmbFqnTVUQfza8JivYOfShz.jpg";
    return (
        // Új lejátszási lista ablak
        <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={"center"}>
            <DialogTrigger mx={"auto"} asChild>
                <Button variant={"surface"} size={"sm"} onClick={()=> setOpen(true)} mx={"5"}>Létrehozás</Button>
            </DialogTrigger>
            <DialogBackdrop onClick={()=>setOpen(false)}/>
            <DialogContent border="10px solid" borderColor="bg" rounded="xl">
            <Theme colorPalette={themecolor} display={"flex"} flexDirection={"column"} bg={"Background"} h={"100%"}>
                <DialogHeader>
                    <DialogTitle>Részletek szerkesztése</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={async (a) => {
                        a.preventDefault();
                        // Új lejátszási lista összeállítása
                        let newPlaylist = {
                            playlistName: playlistName,
                            imageUrl: imageUrl.length < 10 ? prevImg : imageUrl,
                            creatorId: userid,
                        }
                        // Lista létezésének vizsgálata
                        if(!playlists.find(x=>x.playlistName == playlistName)){
                            const res = await createPlaylist(newPlaylist,toaster,load);
                            if(res == 200){
                                setPlaylistName("");
                                setImageUrl("");
                                setOpen(false);
                            }
                        } 
                        else{
                            toaster.create({ title: `Már létrehoztad a(z) ${playlistName} nevű lejátszási listát!`, type: "error" });
                        }
                    }}>
                        <Flex direction={"row"} pb={"3"}>
                            <Button borderRadius="lg" variant="ghost" height="150px" width="150px" backgroundPosition="center" backgroundImage={"url("+(imageUrl.length < 10 ? prevImg : imageUrl)+")"} backgroundSize="cover" boxShadow={`0 0 15px 0 ${themecolor}`}/>
                            <Flex width={"full"} direction={"column"} p={"5"}>
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
